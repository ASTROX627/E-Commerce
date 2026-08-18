import { describe, it, expect } from "vitest";
import { hashToken } from "./hash-token.ts";

describe("hash token", () => {
  it("same input always produces the same output", () => {
    const token = "refresh-token";
    const hash1 = hashToken(token);
    const hash2 = hashToken(token);

    expect(hash1).toBe(hash2);
  });

  it("it produce different hashes for different inputs", () => {
    expect(hashToken("token-a")).not.toBe(hashToken("token-b"));
  })

  it("produce hash different from input", () => {
    expect(hashToken("token")).not.toBe("token");
  })
});
