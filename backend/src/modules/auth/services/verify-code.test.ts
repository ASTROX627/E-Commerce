import { beforeEach } from "node:test";
import { describe, it, expect, vi } from "vitest";
import { verifyOtp } from "./verify-code.ts";
import { deleteOtp, getStoredOtpHash } from "../../../repositories/otp.ts";
import { hashToken } from "../../../utils/hash-token.ts";
import {
  NotFoundError,
  UnauthorizedError,
} from "../../../errors/http-errors.ts";
import { findUserByEmail } from "../repositories/auth-lookups.ts";
import type { User } from "../../../generated/prisma/client.ts";
import { prisma } from "../../../lib/prisma.ts";
import { issueToken } from "./issue-token.ts";

vi.mock("../../../repositories/otp.ts");
vi.mock("../../../modules/auth/repositories/auth-lookups.ts");
vi.mock("../../../lib/prisma.ts", () => ({
  prisma: { user: { update: vi.fn() } },
}));
vi.mock("../../auth/services/issue-token.ts");

describe("verify code service", () => {
  beforeEach(() => vi.clearAllMocks());

  it("throws unauthorized error when no otp store", async () => {
    vi.mocked(getStoredOtpHash).mockResolvedValue(null);

    await expect(verifyOtp("a@b.com", "111111")).rejects.toThrow(
      UnauthorizedError,
    );
  });

  it("throws unauthorized error when the otp does not match", async () => {
    vi.mocked(getStoredOtpHash).mockResolvedValue(hashToken("111111"));

    await expect(verifyOtp("a@b.com", "999999")).rejects.toThrow(
      UnauthorizedError,
    );
  });

  it("throws not found error when no user with this email exists", async () => {
    vi.mocked(getStoredOtpHash).mockResolvedValue(hashToken("123456"));
    vi.mocked(findUserByEmail).mockResolvedValue(null);

    await expect(verifyOtp("a@b.com", "123456")).rejects.toThrow(NotFoundError);
  });

  it("marks the user as verified in the data base", async () => {
    vi.mocked(getStoredOtpHash).mockResolvedValue(hashToken("123456"));
    vi.mocked(findUserByEmail).mockResolvedValue({
      id: "1",
      emailVerified: false,
    } as unknown as User);
    vi.mocked(prisma.user.update).mockResolvedValue({
      id: "1",
      emailVerified: true,
    } as unknown as User);

    await verifyOtp("a@b.com", "123456");

    expect(prisma.user.update).toHaveBeenCalledWith({
      where: { email: "a@b.com" },
      data: { emailVerified: true },
    });
  });

  it("issues tokens for verified user", async () => {
    vi.mocked(getStoredOtpHash).mockResolvedValue(hashToken("123456"));
    vi.mocked(findUserByEmail).mockResolvedValue({
      id: "1",
    } as unknown as User);
    vi.mocked(prisma.user.update).mockResolvedValue({
      id: "1",
      emailVerified: true,
    } as any);
    vi.mocked(issueToken).mockResolvedValue({
      accessToken: "access-token",
      refreshToken: "refresh-token",
    });

    const result = await verifyOtp("a@b.com", "123456");

    expect(result).toEqual({
      accessToken: "access-token",
      refreshToken: "refresh-token",
    });
  });

  it("deletes otp once otp has been used", async () => {
    vi.mocked(getStoredOtpHash).mockResolvedValue(hashToken("123456"));

    await verifyOtp("a@b.com", "123456");

    expect(deleteOtp).toHaveBeenCalledWith("email-verification", "a@b.com");
  });
});
