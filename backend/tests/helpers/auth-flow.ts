import request from "supertest";
import app from "../../src/app.ts";
import { extractOtpFromLastEmail } from "./extract-otp.ts";

interface SignedUpUser {
  email: string;
  userId: string;
}

interface VerifiedUser extends SignedUpUser {
  accessToken: string;
  refreshCookie: string[];
}

let signupCounter = 0;

export async function signUpTestUser(
  overrides: { email?: string; password?: string } = {},
): Promise<SignedUpUser> {
  signupCounter += 1;

  const email = overrides.email ?? `signup-test-${signupCounter}@example.com`;
  const password = overrides.password ?? `StrongPass123`;

  const response = await request(app)
    .post("/api/auth/signup")
    .send({
      name: `Test User ${signupCounter}`,
      email,
      password,
    });
  return {
    email,
    userId: response.body.id,
  };
}

export async function signupAndVerifyTestUser(
  overrides: { email?: string; password?: string } = {},
): Promise<VerifiedUser> {
  const { email, userId } = await signUpTestUser(overrides);
  const otp = extractOtpFromLastEmail(email);

  const verifyResponse = await request(app)
    .post("/api/auth/verify-email")
    .send({email, otp});

  const cookies = verifyResponse.headers["set-cookie"] as unknown as string[] | undefined;

  if(!cookies) {
    throw new Error("set-cookie header not found");
  }

  return {
    email,
    userId,
    accessToken: verifyResponse.body.accessToken,
    refreshCookie: cookies,
  }
}
