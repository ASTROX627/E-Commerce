import { SignJWT } from "jose";
import type { SignJwtOptions } from "../types/jwt.types.ts";

export async function signJwt({
  secret,
  subject,
  jti,
  expiresIn,
  issuer,
  audience,
  claims = {},
}: SignJwtOptions): Promise<string> {
  let builder = new SignJWT(claims)
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(subject)
    .setJti(jti)
    .setIssuedAt()
    .setExpirationTime(expiresIn);

  if (issuer) {
    builder = builder.setIssuer(issuer);
  }
  if (audience) {
    builder = builder.setAudience(audience);
  }

  return builder.sign(secret);
}
