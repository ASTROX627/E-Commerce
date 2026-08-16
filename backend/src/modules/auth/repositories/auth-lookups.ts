import type { User } from "../../../generated/prisma/client.ts";
import { prisma } from "../../../lib/prisma.ts";

export async function findUserByEmail(email: string): Promise<User | null> {
  return prisma.user.findUnique({ where: { email } });
}

export async function findUserById(id: string): Promise<User | null> {
  return prisma.user.findUnique({ where: { id } });
}
