import {rateLimit} from "express-rate-limit"
import { IS_DEVELOPMENT } from "../config/global.ts"

export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: IS_DEVELOPMENT ? Number.POSITIVE_INFINITY : 10,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    type: "https://example.com/problems/rate-limit",
    title: "Too Many Requests",
    status: 429,
    detail: "Too many authentication attempts. Please try again later.",
  },
});
