import { UnauthorizedError } from "../../../errors/http-errors.ts";
import { prisma } from "../../../lib/prisma.ts";
import { deleteOtp, getStoredOtpHash } from "../../../repositories/otp.ts";
import { deleteAllRefreshTokens } from "../../../repositories/refresh-token.ts";
import { incrementTokenVersion } from "../../../repositories/token-version.ts";
import { hashPassword } from "../../../utils/hash-password.ts";
import { hashToken } from "../../../utils/hash-token.ts";
import { findUserByEmail } from "../repositories/auth-lookups.ts";

export async function resetPassword(
  email: string,
  otp: string,
  newPassword: string,
): Promise<void> {
  const storedHash = await getStoredOtpHash("password-reset", email);

  if (!storedHash || storedHash !== hashToken(otp)) {
    throw new UnauthorizedError("Invalid or expired reset code.");
  }

  const user = await findUserByEmail(email);

  if(!user){
    throw new UnauthorizedError("Invalid or expired reset code.");
  }

  const hashedPassword = await hashPassword(newPassword);
  await prisma.user.update({where: {email}, data: {password: hashedPassword}});

  await deleteOtp("password-reset", email);
  await incrementTokenVersion(user.id)
  await deleteAllRefreshTokens(user.id)
}
