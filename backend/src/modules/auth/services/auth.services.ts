import { ConflictError } from "../../../errors/http-errors.ts";
import type { User } from "../../../generated/prisma/client.ts";
import { prisma } from "../../../lib/prisma.ts";
import { hashPassword } from "../../../utils/password.ts";

export async function createUser(
  name: string,
  email: string,
  password: string,
): Promise<User> {
  const userExists = await prisma.user.findUnique({ where: { email } });
  if (userExists) {
    throw new ConflictError("A user with this email already exists.");
  }

  const hashedPassword = await hashPassword(password);
  return prisma.user.create({
    data: { name, email, password: hashedPassword },
  });
}
