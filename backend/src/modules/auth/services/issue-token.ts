import {
  JWT_CLIENT_ID,
  JWT_REFRESH_EXPIRES_IN,
  JWT_REFRESH_EXPIRES_IN_SECONDS,
} from "../../../config/global.ts";
import type { User } from "../../../generated/prisma/client.ts";
import { storeRefreshToken } from "../../../repositories/refresh-token.ts";
import { getTokenVersion } from "../../../repositories/token-version.ts";
import type { TokenPair } from "../../../types/token.types.ts";
import { generateAccessToken } from "../../../utils/access-token.ts";
import { hashToken } from "../../../utils/hash-token.ts";
import { generateRefreshToken } from "../../../utils/refresh-token.ts";

export async function issueToken(user: User): Promise<TokenPair> {
  const version = await getTokenVersion(user.id);

  const accessJti = crypto.randomUUID();
  const accessToken = await generateAccessToken({
    sub: user.id,
    jti: accessJti,
    clientId: JWT_CLIENT_ID,
    role: user.role,
    version,
  });

  const refreshJti = crypto.randomUUID();
  const refreshToken = await generateRefreshToken(user.id, refreshJti);

  await storeRefreshToken(
    user.id,
    refreshJti,
    hashToken(refreshToken),
    JWT_REFRESH_EXPIRES_IN_SECONDS,
  );

  return { accessToken, refreshToken };
}
