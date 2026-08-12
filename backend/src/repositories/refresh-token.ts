import {
  refreshTokenKey,
  refreshTokenPattern,
} from "../constants/redis-keys.ts";
import { redisClient } from "../lib/redis.ts";

export async function storeRefreshToken(
  userId: string,
  jti: string,
  tokenHash: string,
  ttlSeconds: number,
): Promise<void> {
  await redisClient.set(refreshTokenKey(userId, jti), tokenHash, {
    expiration: {
      type: "EX",
      value: ttlSeconds,
    },
  });
}

export async function getStoredRefreshTokenHash(
  userId: string,
  jti: string,
): Promise<string | null> {
  return redisClient.get(refreshTokenKey(userId, jti));
}

export async function deleteRefreshToken(
  userId: string,
  jti: string,
): Promise<void> {
  await redisClient.del(refreshTokenKey(userId, jti));
}

export async function deleteAllRefreshTokens(userId: string): Promise<void> {
  const keys = await redisClient.keys(refreshTokenPattern(userId));
  if (keys.length > 0) {
    await redisClient.del(keys);
  }
}
