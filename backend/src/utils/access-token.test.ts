import { describe, expect, it } from "vitest";
import { generateAccessToken } from "./generate-access-token.ts";
import { UserRole } from "../generated/prisma/enums.ts";
import { verifyAccessToken } from "./verify-access-token.ts";

describe("generation access token / verify access token", () => {
  it("issues a token with all required claims", async () => {
    const token = await generateAccessToken({
      sub: "user-1",
      jti: "jti-1",
      clientId: "web",
      role: UserRole.CUSTOMER,
      version: 0,
    });

    const payload = await verifyAccessToken(token);

    expect(payload.sub).toBe("user-1");
    expect(payload.jti).toBe("jti-1");
    expect(payload.client_id).toBe("web");
    expect(payload.role).toBe(UserRole.CUSTOMER);
    expect(payload.ver).toBe(0);
  });

  it("preverse the role for admin users", async () => {
    const token = await generateAccessToken({
      sub: "user-1",
      jti: "jti-1",
      clientId: "web",
      role: UserRole.ADMIN,
      version: 3,
    });

    const payload = await verifyAccessToken(token);

    expect(payload.role).toBe(UserRole.ADMIN);
    expect(payload.ver).toBe(3);
  });
});
