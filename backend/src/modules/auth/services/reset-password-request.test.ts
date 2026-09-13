import { beforeEach } from "node:test";
import { describe, it, expect, vi } from "vitest";
import { findUserByEmail } from "../repositories/auth-lookups.ts";
import { resetPasswordRequest } from "./reset-password-request.ts";
import { storeOtp } from "../../../repositories/otp.ts";
import { sendEmail } from "../../mail/services/send-email.ts";
import type { User } from "../../../generated/prisma/client.ts";

vi.mock("../repositories/auth-lookups.ts");
vi.mock("../../../repositories/otp.ts");
vi.mock("../../mail/services/send-email.ts");

describe("reset password request", () => {
  beforeEach(() => vi.clearAllMocks());

  it("does not anything when no the user with this email exists", async () => {
    vi.mocked(findUserByEmail).mockResolvedValue(null);

    await expect(resetPasswordRequest("a@b.com")).resolves.toBeUndefined();
    expect(storeOtp).not.toHaveBeenCalled();
    expect(sendEmail).not.toHaveBeenCalled();
  });

  it("stores an otp with reset password otp", async () => {
    vi.mocked(findUserByEmail).mockResolvedValue({id: "1", email: "a@b.com"} as unknown as User);

    await resetPasswordRequest("a@b.com");

    expect(storeOtp).toHaveBeenCalledWith(
      "password-reset",
      "a@b.com",
      expect.any(String),
      expect.any(Number),
    );
  });

  it("sends reset email", async() => {
    vi.mocked(findUserByEmail).mockResolvedValue({
      id: "1",
      email: "a@b.com",
    } as unknown as User);


    await resetPasswordRequest("a@b.com");

    expect(sendEmail).toHaveBeenCalledWith(expect.objectContaining({to: "a@b.com", subject: expect.stringContaining("Reset")}))
  })
});
