import type { Request, Response, NextFunction } from "express";
import { describe, it, expect, vi } from "vitest";
import { asyncHandler } from "./async-handler.ts";
import type { RouteParams } from "../types/express.types.ts";

const mockReq = {} as Request<RouteParams>;
const mockRes = {} as Response;

describe("async handler", () => {
  it("calls the wrapped function with req, res, next", async () => {
    const next = vi.fn() as NextFunction;
    const handler = vi.fn().mockResolvedValue(undefined);
    const wrapped = asyncHandler(handler);

    await wrapped(mockReq, mockRes, next);

    expect(handler).toHaveBeenCalledWith(mockReq, mockRes, next);
  });

  it("does not call next() when the handler resolve successfully", async () => {
    const next = vi.fn() as NextFunction;
    const handler = vi.fn().mockResolvedValue(undefined);
    const wrapped = asyncHandler(handler);

    await wrapped(mockReq, mockRes, next);

    expect(next).not.toHaveBeenCalled();
  });

  it("forwards rejected errors to next", async () => {
    const next = vi.fn() as NextFunction;
    const testError = new Error("someting went wrong");
    const handler = vi.fn().mockRejectedValue(testError);
    const wrapped = asyncHandler(handler);

    wrapped(mockReq, mockRes, next);

    await new Promise((resolve) => setImmediate(resolve));

    expect(next).toHaveBeenCalledWith(testError);
    expect(next).toHaveBeenCalledTimes(1);
  });

  it("forwards any rejected value unchanged", async () => {
    const next = vi.fn() as NextFunction;
    const conflictError = { status: 409, title: "conflict" };
    const handler = vi.fn().mockRejectedValue(conflictError);
    const wrapped = asyncHandler(handler);

    wrapped(mockReq, mockRes, next);

    await new Promise((resolve) => setImmediate(resolve));

    expect(next).toHaveBeenCalledWith(conflictError);
  });

  it("returns a sync function", () => {
    const next = vi.fn() as NextFunction;
    const handler = vi.fn().mockResolvedValue(undefined);
    const wrapped = asyncHandler(handler);

    const result = wrapped(mockReq, mockRes, next);

    expect(result).toBeUndefined();
  });
});
