import { ConflictError } from "../../../errors/http-errors.ts";
import type { User } from "../../../generated/prisma/client.ts";
import { prisma } from "../../../lib/prisma.ts";
import { findUserByEmail } from "../repositories/auth-lookups.ts";
import type { TokenPair } from "../../../types/token.types.ts";
import { hashPassword } from "../../../utils/hash-password.ts";
import { issueToken } from "./issue-token.ts";

export async function createUser(
  name: string,
  email: string,
  password: string,
): Promise<{ user: User; tokens: TokenPair }> {
  const userExists = await findUserByEmail(email);
  if (userExists) {
    throw new ConflictError("A user with this email already exists.");
  }

  const hashedPassword = await hashPassword(password);
  const user = await prisma.user.create({
    data: { name, email, password: hashedPassword },
  });

  const tokens = await issueToken(user);
  return { user, tokens };
}
