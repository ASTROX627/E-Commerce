import { describe, it, expect } from "vitest";
import { setupRedisTest } from "../../tests/helpers/test-lifecycle.ts";
import {
  deleteAllRefreshTokens,
  deleteRefreshToken,
  getStoredRefreshTokenHash,
  storeRefreshToken,
} from "./refresh-token.ts";

describe("refresh token repository", () => {
  setupRedisTest();
  it("stores and retrieves a token hash", async () => {
    await storeRefreshToken("user-1", "jti-1", "hash-token", 3600);
    expect(await getStoredRefreshTokenHash("user-1", "jti-1")).toBe(
      "hash-token",
    );
  });

  it("returns null when no token provided", async () => {
    expect(await getStoredRefreshTokenHash("user-1", "no token")).toBeNull();
  });

  it("deletes a refresh token for a user", async () => {
    await storeRefreshToken("user-1", "jti-1", "hash-token", 3600);
    await deleteRefreshToken("user-1", "jti-1");

    expect(await getStoredRefreshTokenHash("user-1", "jti-1")).toBeNull();
  });

  it("deletes all refresh token for a user", async () => {
    await storeRefreshToken("user-1", "jti-1", "hash-token-1", 3600);
    await storeRefreshToken("user-1", "jti-2", "hash-token-2", 3600);
    await deleteAllRefreshTokens("user-1");

    expect(await getStoredRefreshTokenHash("user-1", "jti-1")).toBeNull();
    expect(await getStoredRefreshTokenHash("user-1", "jti-2")).toBeNull();
  });

  it("a stored token respects its TTL (does not persist forever)", async () => {
    await storeRefreshToken("user-1", "jti-ttl", "hash", 1); 
    await new Promise((resolve) => setTimeout(resolve, 1200));
    expect(await getStoredRefreshTokenHash("user-1", "jti-ttl")).toBeNull();
  }, 3000);
});
