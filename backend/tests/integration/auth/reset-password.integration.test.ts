import { describe, it, expect, vi } from "vitest";
import { setupIntegrationTest } from "../../helpers/test-lifecycle.ts";
import { setupMailMock } from "../../helpers/mail-mock.ts";
import { createUserTest } from "../../factories/user.factory.ts";
import { extractOtpFromLastEmail } from "../../helpers/extract-otp.ts";
import request from "supertest";
import app from "../../../src/app.ts";

describe("post /api/auth/change-password", () => {
  setupIntegrationTest();
  setupMailMock();

  it("returns 200 and reset the password", async () => {
    const user = await createUserTest({
      email: "a@b.com",
      password: "OldPass123",
    });

    const forgotPasswordResponse = await request(app)
      .post("/api/auth/forgot-password")
      .send({
        email: user.email,
      });

    expect(forgotPasswordResponse.status).toBe(200);

    const otp = extractOtpFromLastEmail(user.email);

    const response = await request(app).post("/api/auth/change-password").send({
      email: user.email,
      otp,
      newPassword: "NewPass123",
    });

    expect(response.status).toBe(200);

    const loginResponse = await request(app).post("/api/auth/login").send({
      email: user.email,
      password: "NewPass123",
    });
    expect(loginResponse.status).toBe(200);
  });

  it("invalidates the old passwod after reset", async () => {
    const user = await createUserTest({
      email: "a@b.com",
      password: "OldPass123",
    });

    const forgotPasswordResponse = await request(app)
      .post("/api/auth/forgot-password")
      .send({
        email: user.email,
      });

    expect(forgotPasswordResponse.status).toBe(200);

    const otp = extractOtpFromLastEmail(user.email);

    const response = await request(app).post("/api/auth/change-password").send({
      email: user.email,
      otp,
      newPassword: "NewPass123",
    });

    expect(response.status).toBe(200);

    const loginResponse = await request(app).post("/api/auth/login").send({
      email: user.email,
      password: "OldPass123",
    });
    expect(loginResponse.status).toBe(401);
  });
});
