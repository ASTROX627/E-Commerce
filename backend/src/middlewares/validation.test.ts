import { describe, it, expect } from "vitest";
import {
  createMockNext,
  createMockRequest,
  createMockResponse,
} from "../../tests/helpers/mock-express.ts";
import { validate } from "./validation.ts";
import z from "zod";

const schema = z.object({ email: z.email(), password: z.string().min(6) });

describe("validation middleware", () => {
  it("calls next() with no error when body is valid", () => {
    const req = createMockRequest({
      body: { email: "a@b.com", password: "strongPass123" },
    });
    const res = createMockResponse();
    const next = createMockNext();

    validate(schema)(req, res, next);
    expect(next).toHaveBeenCalledWith();
  });

  it("replaces request body with the parsed/typed result, striping extras", () => {
    const req = createMockRequest({
      body: { email: "a@b.com", password: "strongPass123", extra: "x" },
    });
    const res = createMockResponse();
    const next = createMockNext();

    expect(req.body).toEqual({ emai: "a@b.com", password: "strongPass123" });
  });
});
