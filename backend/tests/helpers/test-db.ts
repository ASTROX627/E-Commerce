import { prisma } from "../../src/lib/prisma.ts";
import { redisClient } from "../../src/lib/redis.ts";

export async function resetDatabase(): Promise<void> {
  await prisma.cartItem.deleteMany();
  await prisma.user.deleteMany();
}

export async function resetRedis(): Promise<void> {
  await redisClient.flushDb();
}

