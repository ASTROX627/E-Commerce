import { describe, it, expect } from "vitest";
import {
  createMockNext,
  createMockRequest,
  createMockResponse,
} from "../../tests/helpers/mock-express.ts";
import { errorHandler } from "./error-handler.ts";
import { ConflictError } from "../errors/http-errors.ts";
import { Prisma } from "../generated/prisma/client.ts";

describe("error handler", () => {
  it("converts errors to the correct status", () => {
    const req = createMockRequest({ originalUrl: "/api/auth/signup" });
    const res = createMockResponse();
    const next = createMockNext();

    errorHandler(new ConflictError("email exists"), req, res, next);

    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.type).toHaveBeenCalledWith("application/problem+json");
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ status: 409, detail: "email exists" }),
    );
  });

  it("converts prisma p2002 to 409 conflict", () => {
    const req = createMockRequest({ originalUrl: "/api/auth/signup" });
    const res = createMockResponse();
    const next = createMockNext();

    const err = new Prisma.PrismaClientKnownRequestError(
      "unique constraint failed",
      {
        code: "P2002",
        clientVersion: "test",
        meta: { target: ["email"] },
      },
    );

    errorHandler(err, req, res, next);
    expect(res.status).toHaveBeenCalledWith(409);
  });

  it("converts prisma p2025 to 404 not found", () => {
    const req = createMockRequest();
    const res = createMockResponse();
    const next = createMockNext();

    const err = new Prisma.PrismaClientKnownRequestError("not found", {
      code: "P2025",
      clientVersion: "test",
    });

    errorHandler(err, req, res, next);
    expect(res.status).toHaveBeenCalledWith(404);
  });

  it("converts prisma p2003 to 422 validation failed", () => {
    const req = createMockRequest();
    const res = createMockResponse();
    const next = createMockNext();

    const err = new Prisma.PrismaClientKnownRequestError("validation failed", {
      code: "P2003",
      clientVersion: "test",
    });

    errorHandler(err, req, res, next);
    expect(res.status).toHaveBeenCalledWith(422);
  });

  it("falls back to 500 for unrecognized errors", () => {
    const req = createMockRequest();
    const res = createMockResponse();
    const next = createMockNext();

    errorHandler(new Error("db connection string leaked"), req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    const body = (res.json as any).mock.calls[0][0];
    expect(body.detail).toBeUndefined();
  });
});
