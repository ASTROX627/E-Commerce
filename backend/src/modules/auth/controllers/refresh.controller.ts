import type { Request } from "express";
import type { Controller } from "../../../types/express.types.ts";
import { asyncHandler } from "../../../utils/async-handler.ts";
import { UnauthorizedError } from "../../../errors/http-errors.ts";
import { refreshToken } from "../services/refresh-token.ts";
import { setRefreshCookie } from "../utils/set-refresh-cookie.ts";

export const refresh: Controller = asyncHandler(async (req, res) => {
  const rawRefreshToken = req.cookies?.["refreshToken"] as string | undefined;

  if (!rawRefreshToken) {
    throw new UnauthorizedError("Refresh token is missing");
  }

  const tokens = await refreshToken(rawRefreshToken);

  setRefreshCookie(res, tokens.refreshToken);

  res.status(200).json({ accessToken: tokens.accessToken });
});
