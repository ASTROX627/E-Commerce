import { beforeEach } from "node:test";
import { describe, vi, it, expect } from "vitest";
import { sendEmail } from "../../../src/modules/mail/services/send-email.ts";
import { setupIntegrationTest } from "../../helpers/test-lifecycle.ts";
import { createUserTest } from "../../factories/user.factory.ts";
import request from "supertest";
import app from "../../../src/app.ts";
import { setupMailMock } from "../../helpers/mail-mock.ts";

vi.mock("../../../src/modules/mail/services/send-email.ts");

describe("post /api/auth/forgot-password", () => {
  setupIntegrationTest();
  setupMailMock()

  it("returns 200 and sends an email for an existing user", async () => {
    const user = await createUserTest({ email: "a@b.com" });
    const response = await request(app)
      .post("/api/auth/forgot-password")
      .send({ email: user.email });

    expect(response.status).toBe(200);
    expect(sendEmail).toHaveBeenCalledWith(
      expect.objectContaining({ to: user.email }),
    );
  });

  it("returns 200 without sending an email for a non existent user", async () => {
    const response = await request(app)
      .post("/api/auth/forgot-password")
      .send({ email: "a@b.com" });

    expect(response.status).toBe(200);
    expect(sendEmail).not.toHaveBeenCalled();
  });
});
