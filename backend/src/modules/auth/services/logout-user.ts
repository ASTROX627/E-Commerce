import { deleteRefreshToken } from "../../../repositories/refresh-token.ts";
import { verifyRefreshToken } from "../../../utils/verfify-refresh-token.ts";

export async function logoutUser(rawRefreshToken: string): Promise<void> {
  const payload = await verifyRefreshToken(rawRefreshToken);
  await deleteRefreshToken(payload.sub, payload.jti);
}
