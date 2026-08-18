import {
  JWT_ACCESS_EXPIRES_IN,
  JWT_AUDIENCE,
  JWT_ISSUER,
} from "../config/global.ts";
import { ACCESSS_SECRET } from "../constants/access-secret.ts";
import type { GenerateAccessTokenInput } from "../types/token.types.ts";
import { signJwt } from "./sign-jwt.ts";


export async function generateAccessToken({
  sub,
  jti,
  clientId,
  role,
  version,
}: GenerateAccessTokenInput): Promise<string> {
  return signJwt({
    secret: ACCESSS_SECRET,
    subject: sub,
    jti,
    expiresIn: JWT_ACCESS_EXPIRES_IN,
    issuer: JWT_ISSUER,
    audience: JWT_AUDIENCE,
    claims: { client_id: clientId, role, ver: version },
  });
}
