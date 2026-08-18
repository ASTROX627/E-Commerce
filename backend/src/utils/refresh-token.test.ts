import { describe, it, expect } from "vitest";
import { generateRefreshToken } from "./generate-refresh-token.ts";
import { verifyRefreshToken } from "./verfify-refresh-token.ts";

describe("generate refresh token / verify refresh token", () => {
  it("issues a token with sub and jti", async () => {
    const token = await generateRefreshToken("user-1", "jti-1");
    const payload = await verifyRefreshToken(token);

    expect(payload.sub).toBe("user-1");
    expect(payload.jti).toBe("jti-1");
  });
});
