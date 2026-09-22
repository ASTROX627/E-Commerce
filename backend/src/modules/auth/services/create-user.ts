import { ConflictError } from "../../../errors/http-errors.ts";
import type { User } from "../../../generated/prisma/client.ts";
import { prisma } from "../../../lib/prisma.ts";
import { findUserByEmail } from "../repositories/auth-lookups.ts";
import { hashPassword } from "../../../utils/hash-password.ts";
import { logger } from "../../../utils/logger.ts";
import { sendVerificationCode } from "./send-verification-code.ts";

export async function createUser(
  name: string,
  email: string,
  password: string,
): Promise<User> {
  const userExists = await findUserByEmail(email);

  if (userExists) {
    throw new ConflictError("A user with this email already exists.");
  }

  const hashedPassword = await hashPassword(password);
  const user = await prisma.user.create({
    data: { name, email, password: hashedPassword },
  });

  await sendVerificationCode(email).catch((error) => {
    logger.info({err: error}, "Failed to send verification code");
  });

  return user;
}
