import { OTP_LENGTH } from "@/constants/otp";
import { extractDigitsFromPaste, sanitizeDigit } from "@/utils/otp";
import { useRef, useState } from "react";

export function useOtpInput() {
  const [values, setValues] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const focusInput = (index: number) => {
    inputsRef.current[index]?.focus();
  };

  const setDigits = (index: number, digit: string) => {
    setValues((prev) => {
      const next = [...prev];
      next[index] = digit;
      return next;
    });
  };

  const handleChange = (index: number, rawValue: string) => {
    const digit = sanitizeDigit(rawValue);
    setDigits(index, digit);
    if (digit && index < OTP_LENGTH - 1) {
      focusInput(index + 1);
    }
  };

  const handleBackSpace = (index: number) => {
    if (values[index]) {
      setDigits(index, "");
      return;
    }
    if (index > 0) {
      setDigits(index - 1, "");
      focusInput(index - 1);
    }
  };

  const handlePaste = (text: string) => {
    const digits = extractDigitsFromPaste(text);
    digits.forEach((digit, i) => setDigits(i, digit));
    focusInput(Math.min(digits.length, OTP_LENGTH - 1));
  };

  const getOtpCode = () => values.join("");
  const isComplete = values.every((v) => v !== "");

  return {
    values,
    inputsRef,
    handleChange,
    handleBackSpace,
    handlePaste,
    getOtpCode,
    isComplete,
  };
}
