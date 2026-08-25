import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  createMockNext,
  createMockRequest,
  createMockResponse,
} from "../../tests/helpers/mock-express.ts";
import { requireAuth } from "./require-auth.ts";
import { UnauthorizedError } from "../errors/http-errors.ts";
import { getTokenVersion } from "../repositories/token-version.ts";
import { verifyAccessToken } from "../utils/verify-access-token.ts";
import type { AccessTokenPayload } from "../types/token.types.ts";

vi.mock("../repositories/token-version.ts");
vi.mock("../utils/verify-access-token.ts");

describe("requireAuth", () => {
  beforeEach(() => vi.clearAllMocks());
  it("throws unautohrized error when authorization header is missing", async () => {
    const req = createMockRequest({ headers: {} });
    const res = createMockResponse();
    const next = createMockNext();
    requireAuth(req, res, next);

    await new Promise((resolve) => setImmediate(resolve));

    expect(next).toHaveBeenCalledWith(expect.any(UnauthorizedError));
  });

  it("throws unauthorized error when header does not start with Bearer", async () => {
    const req = createMockRequest({headers: {authorization: "valid token"}});
    const res = createMockResponse();
    const next = createMockNext();

    requireAuth(req, res, next);
    await new Promise((resolve) => setImmediate(resolve));

    expect(next).toHaveBeenCalledWith(expect.any(UnauthorizedError));
  })

  it("throws unauthorized error when token version is revoked", async () => {
    vi.mocked(verifyAccessToken).mockResolvedValue({sub: "user-1", role: "CUSTOMER", ver: 1} as unknown as AccessTokenPayload);
    vi.mocked(getTokenVersion).mockResolvedValue(2);

    const req = createMockRequest({ headers: { authorization: "Bearer invalid token" } });
    const res = createMockResponse();
    const next = createMockNext();

    requireAuth(req, res, next);

    await new Promise((resolve) => setImmediate(resolve));

    expect(next).toHaveBeenCalledWith(expect.any(UnauthorizedError))
  })
});
