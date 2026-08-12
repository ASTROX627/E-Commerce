import { DURATION_UNIT } from "../constants/duration-unit.ts";

export function parseDurationToSeconds(value: string): number {
  const match = /^(\d+)([smhd])$/.exec(value);

  if (!match) {
    throw new Error(
      `Invalid duration format: "${value}". Expected formats like "7d", "15m", "3600s".`,
    );
  }

  const [, amountStr, unit] = match;
  const amount = Number(amountStr);
  if (!unit) {
    throw new Error("unit undefined");
  }
  const multiplier = DURATION_UNIT[unit];
  if (!multiplier) {
    throw new Error("multiplier not found");
  }

  return amount * multiplier;
}
