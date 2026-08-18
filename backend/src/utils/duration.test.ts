import { describe, it, expect } from "vitest";
import { parseDurationToSeconds } from "./duration.ts";

describe("parseDurationToSeconds", () => {
  it.each([
    ["15m", 900],
    ["7d", 604800],
    ["1h", 3600],
    ["30s", 30],
  ])("converts %s to %d seconds", (input, expected) => {
    expect(parseDurationToSeconds(input)).toBe(expected);
  });

  it("throws on invalid format", () => {
    expect(() => parseDurationToSeconds("garbage")).toThrow();
  });
});
