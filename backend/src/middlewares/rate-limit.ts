import {rateLimit} from "express-rate-limit"
import { IS_DEVELOPMENT } from "../config/global.ts"
import { TooManyRequestsError } from "../errors/http-errors.ts";

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: IS_DEVELOPMENT ? Number.POSITIVE_INFINITY : 10,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  handler: (req, _res, next) => {
    next(new TooManyRequestsError("Too many attempts, Please try again later"));
  }
});
