import { beforeEach } from "node:test";
import { describe, it, expect, vi } from "vitest";
import { deleteOtp, getStoredOtpHash } from "../../../repositories/otp.ts";
import { hashToken } from "../../../utils/hash-token.ts";
import { resetPassword } from "./reset-password.ts";
import { UnauthorizedError } from "../../../errors/http-errors.ts";
import { findUserByEmail } from "../repositories/auth-lookups.ts";
import type { User } from "../../../generated/prisma/client.ts";
import { hashPassword } from "../../../utils/hash-password.ts";
import { prisma } from "../../../lib/prisma.ts";
import { incrementTokenVersion } from "../../../repositories/token-version.ts";
import { deleteAllRefreshTokens } from "../../../repositories/refresh-token.ts";

vi.mock("../../../repositories/otp.ts");
vi.mock("../repositories/auth-lookups.ts");
vi.mock("../../../utils/hash-password.ts");
vi.mock("../../../lib/prisma.ts", () => ({
  prisma: { user: { update: vi.fn() } },
}));
vi.mock("../../../repositories/token-version.ts");
vi.mock("../../../repositories/refresh-token.ts");

describe("reset password", () => {
  beforeEach(() => vi.clearAllMocks());

  it("it throws unauthorized error when the otp does not match", async () => {
    vi.mocked(getStoredOtpHash).mockResolvedValue(hashToken("111111"));

    await expect(
      resetPassword("a@b.com", "999999", "new password"),
    ).rejects.toThrow(UnauthorizedError);
  });

  it("it throws unauthorized error when no opt store", async () => {
    vi.mocked(getStoredOtpHash).mockResolvedValue(null);

    await expect(
      resetPassword("a@b.com", "123456", "new password"),
    ).rejects.toThrow(UnauthorizedError);
  });

  it("throws unauthorized error when no user with this email exists", async () => {
    vi.mocked(getStoredOtpHash).mockResolvedValue(hashToken("123456"));
    vi.mocked(findUserByEmail).mockResolvedValue(null);

    await expect(
      resetPassword("a@b", "123456", "new password"),
    ).rejects.toThrow(UnauthorizedError);
  });

  it("hashes and updates the password", async () => {
    vi.mocked(getStoredOtpHash).mockResolvedValue(hashToken("123456"));
    vi.mocked(findUserByEmail).mockResolvedValue({
      id: "1",
      email: "a@b.com",
    } as unknown as User);
    vi.mocked(hashPassword).mockResolvedValue("hash-new-password");
    vi.mocked(prisma.user.update).mockResolvedValue({
      id: "1",
      password: hashPassword,
    } as any);

    await resetPassword("a@b.com", "123456", "new password");

    expect(prisma.user.update).toHaveBeenCalledWith({
      where: { email: "a@b.com" },
      data: { password: "hash-new-password" },
    });
  });

  it("deletes the otp after password reset", async () => {
    vi.mocked(getStoredOtpHash).mockResolvedValue(hashToken("123456"));
    vi.mocked(findUserByEmail).mockResolvedValue({
      id: "1",
      email: "a@b.com",
    } as unknown as User);
    vi.mocked(hashPassword).mockResolvedValue("hashed");

    await resetPassword("a@b.com", "123456", "new password");

    expect(deleteOtp).toHaveBeenCalledWith("password-reset", "a@b.com");
  });

  it("revokes all existing sessions after password reset", async () => {
    vi.mocked(getStoredOtpHash).mockResolvedValue(hashToken("123456"));
    vi.mocked(findUserByEmail).mockResolvedValue({
      id: "user-1",
      email: "a@b.com",
    } as unknown as User);
    vi.mocked(hashPassword).mockResolvedValue("hashed");

    await resetPassword("a@b.com", "123456", "new password");

    expect(incrementTokenVersion).toHaveBeenCalledWith("user-1");
    expect(deleteAllRefreshTokens).toHaveBeenCalledWith("user-1");
  });
});
