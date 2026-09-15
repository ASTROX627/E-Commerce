import { describe, it, expect} from "vitest";
import request from "supertest"

import { setupIntegrationTest } from "../../helpers/test-lifecycle.ts";
import { setupMailMock } from "../../helpers/mail-mock.ts";
import { signUpTestUser } from "../../helpers/auth-flow.ts";
import { extractOtpFromLastEmail } from "../../helpers/extract-otp.ts";
import app from "../../../src/app.ts";
import { getSetCookieHeader } from "../../helpers/get-set-cookie.ts";

describe("post /api/auth/verify-email", () => {
  setupIntegrationTest();
  setupMailMock();

  it("verifies the email and returns an access token", async () => {
    const {email} = await signUpTestUser();
    const otp = extractOtpFromLastEmail(email);
    const res = await request(app)
      .post("/api/auth/verify-email")
      .send({ email, otp });
    const cookies = getSetCookieHeader(res);


    expect(res.status).toBe(200);
    expect(res.body.accessToken).toEqual(expect.any(String));
    expect(cookies[0]).toContain("HttpOnly");
  })

  it("returns 401 for incorrect otp", async () => {
    const { email } = await signUpTestUser();
    extractOtpFromLastEmail(email);
    const res = await request(app)
      .post("/api/auth/verify-email")
      .send({ email, otp: "000000" });

    expect(res.status).toBe(401);
  });

  it("rejects resusing the same otp twice", async () => {
    const { email } = await signUpTestUser();
    const otp = extractOtpFromLastEmail(email);

    expect((await request(app).post("/api/auth/verify-email").send({email, otp})).status).toBe(200);
    expect(
      (await request(app).post("/api/auth/verify-email").send({ email, otp }))
        .status,
    ).toBe(401);

  })
})
