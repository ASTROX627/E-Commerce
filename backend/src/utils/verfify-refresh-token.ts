import { REFRESH_SECRET } from "../constants/refesh-secret.ts";
import type { RefreshTokenPayload } from "../types/token.types.ts";
import { verifyJwt } from "./verify-jwt.ts";

export async function verifyRefreshToken(
  token: string,
): Promise<RefreshTokenPayload> {
  return verifyJwt<RefreshTokenPayload>(token, {
    secret: REFRESH_SECRET,
    invalidMessage: "Refresh token is invalid",
    expiredMessage: "Refresh token has expired",
  });
}
