import { afterAll, beforeAll } from "vitest";
import { redisClient } from "../src/lib/redis.ts";
import { prisma } from "../src/lib/prisma.ts";
import { loadTestEnv } from "./env.ts";

loadTestEnv();

beforeAll(async () => {
  if (!redisClient.isOpen) {
    await redisClient.connect();
  }
}, 15000);

afterAll(async () => {
  if (redisClient.isOpen) {
    await redisClient.quit();
  }
  await prisma.$disconnect();
}, 15000);
