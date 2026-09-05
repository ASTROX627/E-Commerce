import crypto from "node:crypto";

export function generateOTP(): string {
  const otp = crypto.randomInt(0, 1_000_000);
  return otp.toString().padStart(6, "0");
}
