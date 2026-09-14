import { beforeEach, describe, expect, it, vi } from "vitest";
import { findUserByEmail } from "../repositories/auth-lookups.ts";
import type { User } from "../../../generated/prisma/client.ts";
import { createUser } from "./create-user.ts";
import { ConflictError } from "../../../errors/http-errors.ts";
import { prisma } from "../../../lib/prisma.ts";
import { hashPassword } from "../../../utils/hash-password.ts";
import { sendVerificationCode } from "./send-verification-code.ts";

vi.mock("../repositories/auth-lookups.ts");
vi.mock("../../../lib/prisma.ts", () => ({
  prisma: { user: { create: vi.fn() } },
}));
vi.mock("../../../utils/hash-password.ts");
vi.mock("./send-verification-code.ts");

describe("create user", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(sendVerificationCode).mockResolvedValue(undefined);
  });

  it("throws conflict error when user exists", async () => {
    vi.mocked(findUserByEmail).mockResolvedValue({
      id: "1",
    } as unknown as User);

    await expect(
      createUser("name", "a@b.com", "StrongPass123"),
    ).rejects.toThrow(ConflictError);

    expect(prisma.user.create).not.toHaveBeenCalled();
  });

  it("hashes the password befor user create", async () => {
    vi.mocked(findUserByEmail).mockResolvedValue(null);
    vi.mocked(hashPassword).mockResolvedValue("hashed-password");
    vi.mocked(prisma.user.create).mockResolvedValue({
      id: "1",
      email: "a@b.com",
    } as unknown as User);

    await createUser("user", "a@b.com", "password");

    expect(prisma.user.create).toHaveBeenCalledWith({
      data: { name: "user", email: "a@b.com", password: "hashed-password" },
    });
  });

  it("sends verification code after the user create", async () => {
    vi.mocked(findUserByEmail).mockResolvedValue(null);
    vi.mocked(hashPassword).mockResolvedValue("hashed-password");
    vi.mocked(prisma.user.create).mockResolvedValue({
      id: "1",
      email: "a@b.com",
    } as unknown as User);

    await createUser("user", "a@b.com", "password");

    expect(sendVerificationCode).toHaveBeenCalledWith("a@b.com");
  });

  it("does not throw if sending the verification email fails", async () => {
    vi.mocked(findUserByEmail).mockResolvedValue(null);
    vi.mocked(hashPassword).mockResolvedValue("hashed-password");
    vi.mocked(prisma.user.create).mockResolvedValue({
      id: "1",
      email: "a@b.com",
    } as unknown as User);
    vi.mocked(sendVerificationCode).mockRejectedValue(new Error("stmp error"));

    await expect(
      createUser("user", "a@b.com", "password"),
    ).resolves.toBeDefined();
  });

  it("returns the user", async () => {
    vi.mocked(findUserByEmail).mockResolvedValue(null);
    vi.mocked(hashPassword).mockResolvedValue("hashed-password");
    const mockedUser = { id: "1", email: "a@b.com" };
    vi.mocked(prisma.user.create).mockResolvedValue(
      mockedUser as unknown as User,
    );

    const result = await createUser("user", "a@b.com", "password");
    expect(result).toEqual(mockedUser);
  });
});
