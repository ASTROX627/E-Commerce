import { describe, it, expect } from "vitest";
import { parseDurationToSeconds } from "./duration.ts";

describe("parse duration to seconds", () => {
  it.each([
    { input: "15m", expected: 900 },
    { input: "7d", expected: 604800 },
    { input: "1h", expected: 3600 },
    { input: "30s", expected: 30 },
  ])("converts %s to %d seconds", ({ input, expected }) => {
    expect(parseDurationToSeconds(input)).toBe(expected);
  });

  it("throws on invalid format", () => {
    expect(() => parseDurationToSeconds("garbage")).toThrow();
  });
});
