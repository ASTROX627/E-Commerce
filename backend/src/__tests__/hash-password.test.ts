import { describe, expect, test } from "vitest";
import { hashPassword } from "../utils/hash-password.ts";
import argon2 from "argon2";

describe("hash password", () => {
  test("password hashing", async () => {
    const password = "ALIabbas 4290";
    const hash = await hashPassword(password);

    expect(hash).toBeTypeOf("string");
    expect(hash).not.toBe(password);
    expect(hash.length).toBeGreaterThan(0);
  });

  test("Compare password with hashed password", async () => {
    const password = "ALIabbas 4290";
    const hash = await hashPassword(password);

    expect(await argon2.verify(hash, password)).toBe(true);
  });
});
