import rateLimit from "express-rate-limit";
import { TooManyRequestsError } from "../errors/http-errors.ts";

export const otpRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, _res, next) => {
    next(new TooManyRequestsError("Too many attempts, Please try again later"));
  }
});
