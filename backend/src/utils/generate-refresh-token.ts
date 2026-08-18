import { JWT_REFRESH_EXPIRES_IN } from "../config/global.ts";
import { REFRESH_SECRET } from "../constants/refesh-secret.ts";
import { signJwt } from "./sign-jwt.ts";

export async function generateRefreshToken(
  sub: string,
  jti: string,
): Promise<string> {
  return signJwt({
    secret: REFRESH_SECRET,
    subject: sub,
    jti,
    expiresIn: JWT_REFRESH_EXPIRES_IN,
  });
}
