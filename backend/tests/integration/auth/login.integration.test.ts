import { describe, it, expect } from "vitest";
import { setupIntegrationTest } from "../../helpers/test-lifecycle.ts";
import { createUserTest } from "../../factories/user.factory.ts";
import request from "supertest";
import app from "../../../src/app.ts";

describe("POST /api/auth/login", () => {
  setupIntegrationTest();

  it("logs in a user with correct credentials", async () => {
    const user = await createUserTest({
      email: "a@b.com",
      password: "correctPass123",
    });

    const res = await request(app).post("/api/auth/login").send({
      email: user.email,
      password: "correctPass123",
    });

    expect(res.status).toBe(200);
    expect(res.body.accessToken).toEqual(expect.any(String));
  });

  it("returns 401 for wrong password", async () => {
    const user = await createUserTest({
      email: "a@b.com",
      password: "correctPass123",
    });

    const res = await request(app).post("/api/auth/login").send({
      email: user.email,
      password: "wrongPass123",
    });

    expect(res.status).toBe(401);
  });

  it("returns 401 when user does not exists", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "no@exists.com",
      password: "strongPass123",
    });

    expect(res.status).toBe(401);
    expect(res.body.detail).toEqual("Invalid email or password");
  });

  it("returns 422 for invalid input", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "not-an-email",
      password: "123",
    });

    expect(res.status).toBe(422);
    expect(res.body.errors.email).toBeDefined();
  });
});
