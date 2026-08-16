import { UnauthorizedError } from "../../../errors/http-errors.ts";
import { prisma } from "../../../lib/prisma.ts";
import { findUserById } from "../repositories/auth-lookups.ts";
import {
  deleteAllRefreshTokens,
  deleteRefreshToken,
  getStoredRefreshTokenHash,
} from "../../../repositories/refresh-token.ts";
import type { TokenPair } from "../../../types/token.types.ts";
import { hashToken } from "../../../utils/hash-token.ts";
import { verifyRefreshToken } from "../../../utils/refresh-token.ts";
import { issueToken } from "./issue-token.ts";

export async function refreshToken(
  rawRefreshToken: string,
): Promise<TokenPair> {
  const payload = await verifyRefreshToken(rawRefreshToken);
  const storedHash = await getStoredRefreshTokenHash(payload.sub, payload.jti);
  if (!storedHash || storedHash !== hashToken(rawRefreshToken)) {
    await deleteAllRefreshTokens(payload.sub);
    throw new UnauthorizedError(
      "Refresh token is invalid or has already been used",
    );
  }

  await deleteRefreshToken(payload.sub, payload.jti);

  const user = await findUserById(payload.sub);
  if (!user) {
    throw new UnauthorizedError("User no longer exists");
  }

  return issueToken(user);
}
