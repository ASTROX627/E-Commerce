import { otpKey } from "../constants/redis-keys.ts";
import { redisClient } from "../lib/redis.ts";
import type { OtpPurpose } from "../types/otp.types.ts";


export async function storeOtp(
  purpose: OtpPurpose,
  email: string,
  otpHash: string,
  ttlSeconds: number,
): Promise<void> {
  await redisClient.set(otpKey(purpose, email), otpHash, {
    expiration: { type: "EX", value: ttlSeconds },
  });
}

export async function getStoredOtpHash(
  purpose: OtpPurpose,
  email: string,
): Promise<string | null> {
  return redisClient.get(otpKey(purpose, email));
}

export async function deleteOtp(
  purpose: OtpPurpose,
  email: string,
): Promise<void> {
  await redisClient.del(otpKey(purpose, email));
}
