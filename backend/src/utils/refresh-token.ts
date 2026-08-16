import {
  JWT_REFRESH_EXPIRES_IN,
  JWT_REFRESH_SECRET,
} from "../config/global.ts";
import type { RefreshTokenPayload } from "../types/token.types.ts";
import { signJwt, verifyJwt } from "./jwt.ts";

const refreshSecret = new TextEncoder().encode(JWT_REFRESH_SECRET);

export async function generateRefreshToken(
  sub: string,
  jti: string,
): Promise<string> {
  return signJwt({
    secret: refreshSecret,
    subject: sub,
    jti,
    expiresIn: JWT_REFRESH_EXPIRES_IN,
  });
}

export async function verifyRefreshToken(token: string): Promise<RefreshTokenPayload> {
  return verifyJwt<RefreshTokenPayload>(token, {
    secret: refreshSecret,
    invalidMessage: "Refresh token is invalid",
    expiredMessage: "Refresh token has expired"
  })
}
