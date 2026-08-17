import {
  JWT_ACCESS_EXPIRES_IN,
  JWT_ACCESS_SECRET,
  JWT_AUDIENCE,
  JWT_ISSUER,
} from "../config/global.ts";
import type {
  AccessTokenPayload,
  GenerateAccessTokenInput,
} from "../types/token.types.ts";
import { signJwt, verifyJwt } from "./jwt.ts";

const accessSecret = new TextEncoder().encode(JWT_ACCESS_SECRET!);

export async function generateAccessToken({
  sub,
  jti,
  clientId,
  role,
  version,
}: GenerateAccessTokenInput): Promise<string> {
  return signJwt({
    secret: accessSecret,
    subject: sub,
    jti,
    expiresIn: JWT_ACCESS_EXPIRES_IN,
    issuer: JWT_ISSUER,
    audience: JWT_AUDIENCE,
    claims: { client_id: clientId, role, ver: version },
  });
}

export async function verifyAccessToken(
  token: string,
): Promise<AccessTokenPayload> {
  return verifyJwt<AccessTokenPayload>(token, {
    secret: accessSecret,
    issuer: JWT_ISSUER,
    audience: JWT_AUDIENCE,
    invalidMessage: "Access token is invalid",
    expiredMessage: "Access token has expired",
  });
}
