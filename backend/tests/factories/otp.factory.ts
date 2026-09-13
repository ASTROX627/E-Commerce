import crypto from "node:crypto";

interface OtpContext {
  email: string;
  otp: string;
}

let count = 1;

export function buildOtpFixture(
  overrides: Partial<OtpContext> = {},
): OtpContext {
  count += 1;
  return {
    email: overrides.email ?? `otp-test-${count}@example.com`,
    otp:
      overrides.otp ??
      crypto.randomInt(0, 1_000_000).toString().padStart(6, "0"),
  };
}
