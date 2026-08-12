import type { UserRole } from "../generated/prisma/enums.ts";

export interface AccessTokenPayload {
  aud: string;
  iss: string;
  sub: string;
  client_id: string;
  role: UserRole;
  jti: string;
  iat: number;
  exp: number;
  ver: number;
}

export interface RefreshTokenPayload {
  sub: string;
  jti: string;
  iat: number;
  exp: number;
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

export interface GenerateAccessTokenInput {
  sub: string;
  jti: string;
  clientId: string;
  role: UserRole;
  version: number;
}
