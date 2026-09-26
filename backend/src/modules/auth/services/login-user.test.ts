import { describe, it, expect, vi, beforeEach } from "vitest";
import { findUserByEmail } from "../repositories/auth-lookups.ts";
import { loginUser } from "./login-user.ts";
import { UnauthorizedError } from "../../../errors/http-errors.ts";
import type { User } from "../../../generated/prisma/client.ts";
import { comparePassword } from "../../../utils/compare-password.ts";
import { issueToken } from "./issue-token.ts";
import type { TokenPair } from "../../../types/token.types.ts";

vi.mock("../repositories/auth-lookups.ts");
vi.mock("../../../utils/hash-password.ts");
vi.mock("./issue-token.ts");
vi.mock("../../../utils/compare-password.ts");

describe("login user", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("throws unauthorized error when user does not exists", async () => {
    vi.mocked(findUserByEmail).mockResolvedValue(null);
    await expect(loginUser("nobody@example.com", "any")).rejects.toThrow(
      UnauthorizedError,
    );
  });

  it("throws unauthorized error when email is not verified", async () => {
    const mockUser = {
      id: "1",
      email: "a@b.com",
      password: "hashed",
      emailVerified: false,
    } as unknown as User;

    vi.mocked(findUserByEmail).mockResolvedValue(mockUser);
    vi.mocked(comparePassword).mockResolvedValue(true);

    await expect(loginUser("a@b.com", "password")).rejects.toThrow(UnauthorizedError);
  })

  it("throws unauthorized error when password is wrong", async () => {
    vi.mocked(findUserByEmail).mockResolvedValue({
      id: "1",
      password: "hashed",
    } as unknown as User);
    vi.mocked(comparePassword).mockResolvedValue(false);

    await expect(loginUser("a@b.com", "wrong password")).rejects.toThrow(
      UnauthorizedError,
    );
  });

  it("returns tokens on correct credentials", async () => {
    const mockUser = {
      id: "1",
      email: "a@b.com",
      password: "hashed",
      emailVerified: true,
    } as unknown as User;

    const mockTokens = {
      accessToken: "access",
      refreshToken: "refresh",
    } as TokenPair;
    vi.mocked(findUserByEmail).mockResolvedValue(mockUser);
    vi.mocked(comparePassword).mockResolvedValue(true);
    vi.mocked(issueToken).mockResolvedValue(mockTokens);

    const result = await loginUser("a@b.com", "correct");

    expect(comparePassword).toHaveBeenCalledWith("correct", "hashed");

    expect(issueToken).toHaveBeenCalledWith(mockUser);

    expect(result).toEqual({
      user: mockUser,
      tokens: mockTokens,
    });
  });
});
