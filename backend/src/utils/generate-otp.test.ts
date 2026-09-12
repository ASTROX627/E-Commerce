import { describe, it, expect } from "vitest";
import { generateOTP } from "./generate-otp.ts";

describe("generate otp", () => {
  it("should be return string", () => {
    const otp = generateOTP();
    expect(typeof otp).toBe("string");
  });

  it("it should return 6 characters", () => {
    const otp = generateOTP();
    expect(otp).toHaveLength(6);
  });

  it("should contain only digits", () => {
    const otp = generateOTP();
    expect(otp).toMatch(/^\d{6}$/);
  });

  it("should run successful in multiple run", () => {
    for (let i = 1; i < 1000; i++) {
      const otp = generateOTP();
      expect(otp).toMatch(/^\d{6}$/);
    }
  });
});
