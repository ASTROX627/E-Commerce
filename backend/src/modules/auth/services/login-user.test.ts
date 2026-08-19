import { beforeEach } from "node:test";
import { describe, it, expect, vi } from "vitest";
import { findUserByEmail } from "../repositories/auth-lookups.ts";
import { loginUser } from "./login-user.ts";
import { UnauthorizedError } from "../../../errors/http-errors.ts";
import type { User } from "../../../generated/prisma/client.ts";
import { comparePassword } from "../../../utils/compare-password.ts";
import { issueToken } from "./issue-token.ts";

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
    } as unknown as User;
    vi.mocked(findUserByEmail).mockResolvedValue(mockUser);
    vi.mocked(comparePassword).mockResolvedValue(true);
    vi.mocked(issueToken).mockResolvedValue({
      accessToken: "access",
      refreshToken: "refresh",
    });

    const result = await loginUser("a@b.com", "correct");
    expect(result.tokens.accessToken).toBe("access");
    expect(comparePassword).toHaveBeenCalledWith("correct", "hashed");
  });
});
