import { describe, it, expect } from "vitest";
import { hashPassword } from "./hash-password.ts";
import { comparePassword } from "./compare-password.ts";

describe("hash password / compare password", () => {
  it("produces a hash for a password", async () => {
    const hash = await hashPassword("myPassword123");
    expect(hash).not.toBe("myPassword123");
    expect(hash).toContain("$argon2id$");
  });

  it("produces different hashes for same password", async () => {
    const hash1 = await hashPassword("myPassword123");
    const hash2 = await hashPassword("myPassword123");
    expect(hash1).not.toBe(hash2);
  });

  it("compare password returns true for the correct password", async () => {
    const hash = await hashPassword("myPassword123");
    await expect(comparePassword("myPassword123", hash)).resolves.toBe(true);
  });

  it("compare password returns false for the incorrect password", async () => {
    const hash = await hashPassword("myPassword123");
    await expect(comparePassword("wrongPassword", hash)).resolves.toBe(false);
  });
});
