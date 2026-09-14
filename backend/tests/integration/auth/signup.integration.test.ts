import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../../../src/app.ts";
import { setupIntegrationTest } from "../../helpers/test-lifecycle.ts";
import { createUserTest } from "../../factories/user.factory.ts";

describe("POST /api/auth/signup", () => {
  setupIntegrationTest();
  it("creates a user and returns 201 with an access token", async () => {
    const res = await request(app).post("/api/auth/signup").send({
      name: "ali",
      email: "ali@1.com",
      password: "StrongPass123",
    });

    expect(res.status).toBe(201);
    expect(res.body.password).toBeUndefined();
    expect(res.body.name).toBe("ali");
    expect(res.body.email).toBe("ali@1.com");
  });

  it("returns 409 when user does exists", async () => {
    await createUserTest({ email: "a@b.com" });
    const res = await request(app).post("/api/auth/signup").send({
      name: "ali",
      email: "a@b.com",
      password: "StrongPass123",
    });

    expect(res.status).toBe(409);
    expect(res.headers["content-type"]).toContain("application/problem+json");
  });

  it("returns 422 for invalid input", async () => {
    const res = await request(app).post("/api/auth/signup").send({
      name: "",
      email: "not-an-email",
      password: "123",
    });

    expect(res.status).toBe(422);
    expect(res.body.errors.email).toBeDefined();
  });
});
