import { JWT_AUDIENCE, JWT_ISSUER } from "../config/global.ts";
import { ACCESSS_SECRET } from "../constants/access-secret.ts";
import type { AccessTokenPayload } from "../types/token.types.ts";
import { verifyJwt } from "./verify-jwt.ts";

export async function verifyAccessToken(
  token: string,
): Promise<AccessTokenPayload> {
  return verifyJwt<AccessTokenPayload>(token, {
    secret: ACCESSS_SECRET,
    issuer: JWT_ISSUER,
    audience: JWT_AUDIENCE,
    invalidMessage: "Access token is invalid",
    expiredMessage: "Access token has expired",
  });
}
