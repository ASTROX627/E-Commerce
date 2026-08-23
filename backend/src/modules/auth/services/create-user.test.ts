import { describe, it, expect, vi, beforeEach } from "vitest";
import { findUserByEmail } from "../repositories/auth-lookups.ts";
import type { User } from "../../../generated/prisma/client.ts";
import { createUser } from "./create-user.ts";
import { ConflictError } from "../../../errors/http-errors.ts";
import { hashPassword } from "../../../utils/hash-password.ts";
import { prisma } from "../../../lib/prisma.ts";
import { issueToken } from "./issue-token.ts";
import type { TokenPair } from "../../../types/token.types.ts";
import { HASHED_PASSWORD, PASSWORD } from "../../../test/constants/test-constant.ts";

vi.mock("../repositories/auth-lookups.ts");
vi.mock("../../../utils/hash-password.ts");
vi.mock("../../../lib/prisma.ts");
vi.mock("../services/issue-token.ts");

describe("create user", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("throws conflict error when user exists", async () => {
    vi.mocked(findUserByEmail).mockResolvedValue({
      email: "a@b.com",
    } as unknown as User);

    await expect(createUser("ali", "a@b.com", "password")).rejects.toThrow(
      ConflictError,
    );
  });

  it("hashes the password before creating the user", async () => {

    vi.mocked(findUserByEmail).mockResolvedValue(null);
    vi.mocked(hashPassword).mockResolvedValue(HASHED_PASSWORD);

    const mockUser = {
      name: "ali",
      email: "a@b.com",
      password: HASHED_PASSWORD,
    } as unknown as User;

    vi.spyOn(prisma.user, "create").mockResolvedValue(mockUser);

    vi.mocked(issueToken).mockResolvedValue({
      accessToken: "access",
      refreshToken: "refresh",
    });

    await createUser("ali", "a@b.com", PASSWORD);

    expect(hashPassword).toHaveBeenCalledWith(PASSWORD);

    expect(prisma.user.create).toHaveBeenCalledWith({
      data: {
        name: "ali",
        email: "a@b.com",
        password: HASHED_PASSWORD,
      },
    });
  });

  it("creates user and returns tokens", async () => {
    const password = "password";
    const hashedPassword = "hashed-password";

    const mockUser = {
      id: "1",
      name: "ali",
      email: "a@b.com",
      password: hashedPassword,
    } as unknown as User;

    const mockTokens = {
      accessToken: "access",
      refreshToken: "refresh",
    }as TokenPair;

    vi.mocked(findUserByEmail).mockResolvedValue(null);
    vi.mocked(hashPassword).mockResolvedValue(hashedPassword);
    vi.spyOn(prisma.user, "create").mockResolvedValue(mockUser);
    vi.mocked(issueToken).mockResolvedValue(mockTokens);

    const result = await createUser("ali", "a@b.com", password);

    expect(hashPassword).toHaveBeenCalledWith(password);

    expect(prisma.user.create).toHaveBeenCalledWith({
      data: {
        name: "ali",
        email: "a@b.com",
        password: hashedPassword,
      },
    });

    expect(issueToken).toHaveBeenCalledWith(mockUser);

    expect(result).toEqual({
      user: mockUser,
      tokens: mockTokens,
    });
  });
});
