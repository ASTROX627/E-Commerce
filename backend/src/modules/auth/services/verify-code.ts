import {
  NotFoundError,
  UnauthorizedError,
} from "../../../errors/http-errors.ts";
import { prisma } from "../../../lib/prisma.ts";
import { deleteOtp, getStoredOtpHash } from "../../../repositories/otp.ts";
import type { TokenPair } from "../../../types/token.types.ts";
import { hashToken } from "../../../utils/hash-token.ts";
import { findUserByEmail } from "../repositories/auth-lookups.ts";
import { issueToken } from "./issue-token.ts";

export async function verifyOtp(
  email: string,
  otp: string,
): Promise<TokenPair> {
  const stordeHash = await getStoredOtpHash("email-verification", email);

  if (!stordeHash || stordeHash !== hashToken(otp)) {
    throw new UnauthorizedError("Invalid or expired verification code.");
  }

  const user = await findUserByEmail(email);

  if (!user) {
    throw new NotFoundError("user not found");
  }

  const updatedUser = await prisma.user.update({
    where: { email },
    data: { emailVerified: true },
  });
  await deleteOtp("email-verification", email);

  return issueToken(updatedUser);
}
