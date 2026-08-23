import { afterAll, beforeAll } from "vitest";
import { redisClient } from "../src/lib/redis.ts";
import { prisma } from "../src/lib/prisma.ts";

process.env.NODE_ENV = "test";
process.env.JWT_ACCESS_SECRET = "test-access-secret";
process.env.JWT_REFRESH_SECRET = "test-refresh-secret";
process.env.JWT_ISSUER = "ecommerce-api-test";
process.env.JWT_AUDIENCE = "ecommerce-client-test";
process.env.JWT_CLIENT_ID = "ecommerce-web-test";
process.env.JWT_ACCESS_EXPIRES_IN = "15m";
process.env.JWT_REFRESH_EXPIRES_IN = "7d";

beforeAll(async () => {
  if (!redisClient.isOpen) {
    await redisClient.connect();
  }
});

afterAll(async () => {
  if (redisClient.isOpen) {
    await redisClient.quit();
  }
  await prisma.$disconnect();
});
