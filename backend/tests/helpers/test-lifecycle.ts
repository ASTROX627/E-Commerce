import { beforeEach } from "vitest";
import { resetDatabase, resetRedis } from "./test-db.ts";

export function setupIntegrationTest(): void {
  beforeEach(async () => {
    await resetDatabase();
    await resetRedis();
  });
}

export function setupRedisTest(): void {
  beforeEach(async () => {
    await resetRedis();
  });
}
