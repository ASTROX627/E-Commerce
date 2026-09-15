import type { Response } from "supertest";

export function getSetCookieHeader(response: Response): string[] {
  const cookies = response.headers["set-cookie"] as unknown as
    | string[]
    | undefined;

  if(!cookies || cookies.length === 0) {
    throw new Error("set-cookie header not found");
  }

  return cookies;
}
