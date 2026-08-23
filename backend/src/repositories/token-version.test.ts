import { describe, it, expect } from "vitest";
import { setupRedisTest } from "../../tests/helpers/test-lifecycle.ts";
import {
  decrementTokenVersion,
  getTokenVersion,
  incrementTokenVersion,
} from "./token-version.ts";

describe("token version repositories", () => {
  setupRedisTest();

  it("returns 0 for a user with no version set", async () => {
    expect(await getTokenVersion("new-user")).toBe(0);
  });

  it("increment the version of the token", async () => {
    await incrementTokenVersion("user-1");
    expect(await getTokenVersion("user-1")).toBe(1);
    expect(await getTokenVersion("user-1")).not.toBe(0);
  });

  it("decrement the version of the token", async () => {
    await incrementTokenVersion("user-1");
    await decrementTokenVersion("user-1");
    expect(await getTokenVersion("user-1")).toBe(0);
    expect(await getTokenVersion("user-1")).not.toBe(1);
  });
});
