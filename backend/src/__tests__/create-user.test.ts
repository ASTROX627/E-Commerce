import { beforeEach, describe, expect, test, vi } from "vitest";
import { findUserByEmail } from "../modules/auth/repositories/auth-lookups.ts";
import { hashPassword } from "../utils/hash-password.ts";
import { issueToken } from "../modules/auth/services/issue-token.ts";
import { prisma } from "../lib/prisma.ts";
import { UserRole } from "../generated/prisma/enums.ts";
import { createUser } from "../modules/auth/services/create-user.ts";

vi.mock("../lib/prisma.ts", () => ({
  prisma: {
    user: {
      create: vi.fn(),
    },
  },
}));

vi.mock("../modules/auth/repositories/auth-lookups.ts", () => ({
  findUserByEmail: vi.fn(),
}));

vi.mock("../utils/hash-password.ts", () => ({
  hashPassword: vi.fn(),
}));

vi.mock("../modules/auth/services/issue-token.ts", () => ({
  issueToken: vi.fn(),
}));

describe("create user", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("should create a user succesfully", async () => {
    const user = {
      id: "user-1",
      name: "ali",
      email: "ali@gmail.com",
      password: "password",
      role: UserRole.CUSTOMER,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const tokens = {
      accessToken: "access-token",
      refreshToken: "refresh-token",
    };

    vi.mocked(findUserByEmail).mockResolvedValue(null);
    vi.mocked(hashPassword).mockResolvedValue("password");
    vi.mocked(prisma.user.create).mockResolvedValue(user);
    vi.mocked(issueToken).mockResolvedValue(tokens);

    const result = await createUser("ali", "ali@gmail.com", "password");

    expect(result).toEqual({ user, tokens });
    expect(findUserByEmail).toHaveBeenCalledWith("ali@gmail.com");
    expect(prisma.user.create).toHaveBeenCalledWith({
      data: {
        name: "ali",
        email: "ali@gmail.com",
        password: "password",
      },
    });
    expect(issueToken).toHaveBeenCalledWith(user);
  });
});
