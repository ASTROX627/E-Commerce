import { SignJWT, errors as joseErrors, jwtVerify, type JWTPayload, type JWTVerifyOptions } from "jose";
import type { SignJwtOptions, VerifyJwtOptions } from "../types/jwt.types.ts";
import { UnauthorizedError } from "../errors/http-errors.ts";


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

export async function verifyJwt<T extends JWTPayload>(
  token: string,
  { secret, issuer, audience, invalidMessage, expiredMessage}: VerifyJwtOptions,
): Promise<T> {
  const verifyOptions: JWTVerifyOptions = {
    ...(issuer ? { issuer } : {}),
    ...(audience? {audience}: {}),
  };
  try {
    const {payload} = await jwtVerify(token, secret, verifyOptions);
    return payload as T;
  } catch (error) {
    if(error instanceof joseErrors.JWTExpired){
      throw new UnauthorizedError(expiredMessage);
    }
    throw new UnauthorizedError(invalidMessage)
  }
}
