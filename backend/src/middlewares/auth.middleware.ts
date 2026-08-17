import type { Request, Response } from "express";
import type { Controller } from "../types/express.types.ts";
import { asyncHandler } from "../utils/async-handler.ts";
import { UnauthorizedError } from "../errors/http-errors.ts";
import { verifyAccessToken } from "../utils/access-token.ts";
import { getTokenVersion } from "../repositories/token-version.ts";

export const requireAuth: Controller = asyncHandler(
  async (req: Request, _res: Response, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer  ")) {
      throw new UnauthorizedError("Access token is missing");
    }

    const token = authHeader.slice("Bearer ".length);
    const payload = await verifyAccessToken(token);

    const currentVersion = await getTokenVersion(payload.sub);
    if (payload.ver !== currentVersion) {
      throw new UnauthorizedError(
        "Access token has been revoked. Please log in again.",
      );
    }

    req.user = { id: payload.sub, role: payload.role };
    next();
  },
);
