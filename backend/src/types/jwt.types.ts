export interface SignJwtOptions {
  secret: Uint8Array;
  subject: string;
  jti: string;
  expiresIn: string;
  issuer?: string | undefined;
  audience?: string | undefined;
  claims?: Record<string, unknown>
}

export interface VerifyJwtOptions {
  secret: Uint8Array;
  issuer?: string | undefined;
  audience?: string | undefined;
  invalidMessage: string;
  expiredMessage: string;
}
