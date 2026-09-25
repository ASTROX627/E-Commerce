import { OTP_LENGTH } from "@/constants/otp";

export function sanitizeDigit(value: string): string {
  const digits = value.replace(/[^0-9]/g, "");
  return digits ? digits[digits.length - 1] : "";
}

export function extractDigitsFromPaste(text: string): string[] {
  return text
    .replace(/[^0-9]/g, "")
    .slice(0, OTP_LENGTH)
    .split("");
}
