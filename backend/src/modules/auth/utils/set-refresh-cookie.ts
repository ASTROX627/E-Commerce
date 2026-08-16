import type { Response } from "express";
import { IS_PRODUCTION, JWT_REFRESH_EXPIRES_IN } from "../../../config/global.ts";
import { parseDurationToSeconds } from "../../../utils/duration.ts";

export function setRefreshCookie(res: Response, refreshToken: string): void {
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: IS_PRODUCTION,
    sameSite: "strict",
    path: "/api/auth",
    maxAge: parseDurationToSeconds(JWT_REFRESH_EXPIRES_IN) * 1000
  })
}
