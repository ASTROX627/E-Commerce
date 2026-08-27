import {describe, it, expect} from "vitest";
import request from "supertest";
import { setupIntegrationTest } from "../../helpers/test-lifecycle.ts";
import { signUpTestUser } from "../../helpers/auth-flow.ts";
import app from "../../../src/app.ts";


describe("POST /api/auth/logout", () => {
  setupIntegrationTest();

  it("logs out user and clears refresh token cookie", async () => {
    const {refreshCookie} = await signUpTestUser();

    const res = await request(app).post("/api/auth/logout").set("Cookie", refreshCookie);

    expect(res.status).toBe(200);
    expect(res.headers['set-cookie']![0]).toMatch(/refreshToken=;/);
  })
})
