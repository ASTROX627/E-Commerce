import { describe, expect, it } from "vitest";
import { signJwt } from "./sign-jwt.ts";
import { type JWTPayload } from "jose";
import { verifyJwt } from "./verify-jwt.ts";
import { UnauthorizedError } from "../errors/http-errors.ts";

const secret = new TextEncoder().encode("test-secret-key-for-jwt-tests");

interface TestPayload extends JWTPayload {
  sub: string;
  jti: string;
}

describe("sign jwt / verify jwt", () => {
  it("signs and verify a valid token", async () => {
    const token = await signJwt({
      secret,
      subject: "user-1",
      jti: "jti-1",
      expiresIn: "15m",
    });

    const payload = await verifyJwt<TestPayload>(token, {
      secret,
      invalidMessage: "invalid",
      expiredMessage: "expired",
    });

    expect(payload.sub).toBe("user-1");
    expect(payload.jti).toBe("jti-1");
  });

  it("includes issuer and audience when provide", async () => {
    const token = await signJwt({
      secret,
      subject: "user-1",
      jti: "jti-1",
      expiresIn: "15m",
      issuer: "test-issuer",
      audience: "test-audience",
    });

    const payload = await verifyJwt<TestPayload>(token, {
      secret,
      issuer: "test-issuer",
      audience: "test-audience",
      invalidMessage: "invalid",
      expiredMessage: "expired",
    });

    expect(payload.iss).toBe("test-issuer");
    expect(payload.aud).toBe("test-audience");
  });

  it("throws unauthorizedError when issuer not match", async () => {
    const token = await signJwt({
      secret,
      subject: "user-1",
      jti: "jti-1",
      expiresIn: "15m",
      issuer: "wrong-issuer",
    });

    await expect(
      verifyJwt<TestPayload>(token, {
        secret,
        issuer: "expected-issuer",
        invalidMessage: "invalid",
        expiredMessage: "expired",
      }),
    ).rejects.toThrow(UnauthorizedError);
  });

  it("throws unauthorizedError for an expired token", async () => {
    const token = await signJwt({
      secret,
      subject: "user-1",
      jti: "jti-1",
      expiresIn: "-1s",
    });

    await expect(
      verifyJwt<TestPayload>(token, {
        secret,
        invalidMessage: "invalid",
        expiredMessage: "expired",
      }),
    ).rejects.toThrow("expired");
  });

  it("throws unauthorized error for a token signed with a different secret", async () => {
    const otherSecret = new TextEncoder().encode("anoher-secret");
    const token = await signJwt({
      secret: otherSecret,
      subject: "user-1",
      jti: "jti-1",
      expiresIn: "15m",
    });

    await expect(
      verifyJwt<TestPayload>(token, {
        secret,
        invalidMessage: "invalid",
        expiredMessage: "expired",
      }),
    ).rejects.toThrow("invalid");
  });
});
