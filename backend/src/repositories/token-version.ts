import { tokenVersionKey } from "../constants/redis-keys.ts";
import { redisClient } from "../lib/redis.ts";

export async function getTokenVersion(userId: string): Promise<number> {
  const version = await redisClient.get(tokenVersionKey(userId));
  return version ? Number(version) : 0;
}

export async function incrementTokenVersion(userId: string): Promise<void> {
  await redisClient.incr(tokenVersionKey(userId));
}
