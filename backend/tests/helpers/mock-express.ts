import type { Request, Response } from "express";
import type { NextFunction } from "express-serve-static-core";
import { vi } from "vitest";

export function createMockRequest(overrides: Partial<Request> = {}): Request {
  return {
    body: {},
    params: {},
    query: {},
    headers: {},
    cookies: {},
    ...overrides,
  } as Request;
}

export function createMockResponse(): Response {
  const res: Partial<Response> = {};
  res.status = vi.fn().mockReturnValue(res);
  res.type = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  res.cookie = vi.fn().mockReturnValue(res);
  res.clearCookie = vi.fn().mockReturnValue(res);
  res.send = vi.fn().mockReturnValue(res);
  return res as Response;
}

export function createMockNext(): NextFunction {
  return vi.fn() as NextFunction;
}
