import { describe, expect, it } from "vitest";
import { validateEnv } from "./validate-env.ts";

describe("validate env", () => {
  it("does not throw an error when all values are provided", () => {
    expect(() => validateEnv({ A: "valueA", B: "valueB" })).not.toThrow();
  });

  it("throws an error when a value is missing(empty string or undefined)", () => {
    expect(() => validateEnv({ A: "valueA", B: undefined, C: "" })).toThrow(
      /B, C/,
    );
  });
});
