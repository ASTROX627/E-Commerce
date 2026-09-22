import { redisClient } from "../lib/redis.ts";
import { logger } from "../utils/logger.ts";

redisClient.on("error", (error) => {
  logger.error({err: error}, "Faild to connect to Redis");
});

redisClient.on("connect", () => {
  logger.info("Connected to redis");
});

export async function connectToRedis(): Promise<void> {
  await redisClient.connect();
}
