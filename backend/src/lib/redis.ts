import { createClient } from "redis";
import { REDIS_URL } from "../config/global.ts";
export const redisClient = createClient({
  url: REDIS_URL!,
  socket: {
    tls: true,
    connectTimeout: 30000,
  },
});
