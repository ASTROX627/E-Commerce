import type { OtpPurpose } from "../types/otp.types.ts";

export function refreshTokenKey(userId: string, jti: string): string {
  return `refresh-token:${userId}:${jti}`;
}

export function refreshTokenPattern(userId: string): string {
  return `refresh-token:${userId}:*`;
}

export function tokenVersionKey(userId: string): string {
  return `token-version:${userId}`;
}

export function otpKey(purpose: OtpPurpose, email: string): string {
  return `otp:${purpose}:${email.toLowerCase()}`;
}
