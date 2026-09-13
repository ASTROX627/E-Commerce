import { beforeEach } from "node:test";
import { describe, expect, it, vi } from "vitest";
import { sendVerificationCode } from "./send-verification-code.ts";
import { storeOtp } from "../../../repositories/otp.ts";
import { sendEmail } from "../../mail/services/send-email.ts";

vi.mock("../../../repositories/otp.ts");
vi.mock("../../mail/services/send-email.ts");

describe("send verifivation code serivice", () => {
  beforeEach(() => vi.clearAllMocks());

  it("stores a hashed otp with the correct purpose", async () => {
    await sendVerificationCode("a@b.com");

    expect(storeOtp).toHaveBeenCalledWith(
      "email-verification",
      "a@b.com",
      expect.any(String),
      expect.any(Number),
    );
  });

  it("send an email for verification", async () => {
    await sendVerificationCode("a@b.com");

    expect(sendEmail).toHaveBeenCalledWith(
      expect.objectContaining({
        to: "a@b.com",
        subject: expect.stringContaining("Verify"),
      }),
    );
  });

  it("stores a hash for otp", async () => {
    await sendVerificationCode("a@b.com");

    const storedValue = vi.mocked(storeOtp).mock.calls[0]?.[2] as String;
    expect(storedValue).toMatch(/^[a-f0-9]{64}$/)
  })
});
