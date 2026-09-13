import type { User } from "../../src/generated/prisma/client.ts";
import { UserRole } from "../../src/generated/prisma/enums.js";
import { prisma } from "../../src/lib/prisma.ts";
import { hashPassword } from "../../src/utils/hash-password.ts";

interface CreateTestUserOptions {
  name?: string;
  email?: string;
  password?: string;
  role?: UserRole;
  emailVerified?: boolean;
}

let userCount = 0;

export async function createUserTest(
  options: CreateTestUserOptions = {},
): Promise<User> {
  userCount += 1;
  const {
    name = `Test User ${userCount}`,
    email = `test-user-${userCount}@example.com`,
    password = "StrongPass123",
    role = UserRole.CUSTOMER,
    emailVerified = true,
  } = options;

  return prisma.user.create({
    data: {
      name,
      email,
      password: await hashPassword(password),
      role,
      emailVerified,
    },
  });
}
