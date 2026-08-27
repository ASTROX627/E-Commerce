import request from "supertest";
import app from "../../src/app.ts";

interface SignedUpUser {
  accessToken: string;
  refreshCookie: string[];
  userId: string;
}

let signupCounter = 0;

export async function signUpTestUser(
  overrides: { email?: string; password?: string } = {},
): Promise<SignedUpUser> {
  signupCounter += 1;

  const response = await request(app).post("/api/auth/signup").send({
    name: `Test User ${signupCounter}`,
    email: overrides.email ?? `signup-test-${signupCounter}@example.com`,
    password: overrides.password ?? "StrongPass123",
  });

  const cookies = response.headers["set-cookie"] as unknown as string[] | undefined;

  if (!cookies) {
    throw new Error("set-cookie header not found");
  }

  return {
    accessToken: response.body.accessToken,
    refreshCookie: cookies,
    userId: response.body.id,
  };
}
