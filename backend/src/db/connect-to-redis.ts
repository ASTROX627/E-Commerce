import { redisClient } from "../lib/redis.ts";
import { logger } from "../utils/logger.ts";

redisClient.on("error", (error) => {
  logger.error("Redis connection error", error);
});

redisClient.on("connect", () => {
  logger.info("Connected to redis");
});

export async function connectToRedis(): Promise<void> {
  await redisClient.connect();
}
