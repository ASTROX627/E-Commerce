import { describe, it, expect } from "vitest";
import { setupRedisTest } from "../../tests/helpers/test-lifecycle.ts";
import { deleteOtp, getStoredOtpHash, storeOtp } from "./otp.ts";

describe("otp repository", () => {
  setupRedisTest();

  it("stores and retrives an OTP", async () => {
    await storeOtp("email-verification", "a@b.com", "hash-otp", 600);
    expect(await getStoredOtpHash("email-verification", "a@b.com")).toBe(
      "hash-otp",
    );
  });

  it("has different beheavior with different purpose", async () => {
    await storeOtp("email-verification", "a@b.com", "verify-otp", 600);
    await storeOtp("password-reset", "a@b.com", "password-otp", 600);

    expect(await getStoredOtpHash("email-verification", "a@b.com")).toBe(
      "verify-otp",
    );
    expect(await getStoredOtpHash("password-reset", "a@b.com")).toBe(
      "password-otp",
    );
  });

  it("returns null when otp has expired", async () => {
    await storeOtp("email-verification", "a@b.com", "verify-otp", 1);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    expect(await getStoredOtpHash("email-verification", "a@b.com")).toBeNull();
  });

  it("deletes only the specified pupose otp", async () => {
    await storeOtp("email-verification", "a@b.com", "verify-otp", 600);
    await storeOtp("password-reset", "a@b.com", "password-otp", 600);

    await deleteOtp("email-verification", "a@b.com");

    expect(await getStoredOtpHash("email-verification", "a@b.com")).toBeNull();
    expect(await getStoredOtpHash("password-reset", "a@b.com")).toBe(
      "password-otp",
    );
  });
});
