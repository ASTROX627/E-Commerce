import {
  JWT_REFRESH_EXPIRES_IN,
  JWT_REFRESH_SECRET,
} from "../config/global.ts";
import { signJwt } from "./jwt.ts";

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
