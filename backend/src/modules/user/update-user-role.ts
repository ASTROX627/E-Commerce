import type { UserRole } from "../../generated/prisma/enums.ts";
import { prisma } from "../../lib/prisma.ts";
import { deleteAllRefreshTokens } from "../../repositories/refresh-token.ts";
import { incrementTokenVersion } from "../../repositories/token-version.ts";

export async function updateUserRole(
  userId: string,
  newRole: UserRole,
): Promise<void> {
  await prisma.user.update({ where: { id: userId }, data: { role: newRole } });

  await incrementTokenVersion(userId);
  await deleteAllRefreshTokens(userId);
}
