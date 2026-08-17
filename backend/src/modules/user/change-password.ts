import { prisma } from "../../lib/prisma.ts";
import { deleteAllRefreshTokens } from "../../repositories/refresh-token.ts";
import { incrementTokenVersion } from "../../repositories/token-version.ts";
import { hashPassword } from "../../utils/hash-password.ts";

export async function changePassword(
  userId: string,
  newPassword: string,
): Promise<void> {
  const hashedPassword = await hashPassword(newPassword);
  await prisma.user.update({
    where: { id: userId },
    data: { password: hashedPassword },
  });

  await incrementTokenVersion(userId);
  await deleteAllRefreshTokens(userId);
}
