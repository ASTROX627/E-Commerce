import {
  errors as joseErrors,
  jwtVerify,
  type JWTPayload,
  type JWTVerifyOptions,
} from "jose";
import type { VerifyJwtOptions } from "../types/jwt.types.ts";
import { UnauthorizedError } from "../errors/http-errors.ts";

export async function verifyJwt<T extends JWTPayload>(
  token: string,
  {
    secret,
    issuer,
    audience,
    invalidMessage,
    expiredMessage,
  }: VerifyJwtOptions,
): Promise<T> {
  const verifyOptions: JWTVerifyOptions = {
    ...(issuer ? { issuer } : {}),
    ...(audience ? { audience } : {}),
  };
  try {
    const { payload } = await jwtVerify(token, secret, verifyOptions);
    return payload as T;
  } catch (error) {
    if (error instanceof joseErrors.JWTExpired) {
      throw new UnauthorizedError(expiredMessage);
    }
    throw new UnauthorizedError(invalidMessage);
  }
}
