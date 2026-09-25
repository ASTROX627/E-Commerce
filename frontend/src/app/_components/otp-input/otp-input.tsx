"use client";

import { OtpInputProps } from "./otp-input.types";

export const OtpInput: React.FC<OtpInputProps> = ({
  value,
  onChange,
  onBackSpace,
  onPaste,
  inputRef,
}) => {
  return (
    <input
      ref={inputRef}
      value={value}
      type="text"
      inputMode="numeric"
      maxLength={1}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Backspace") {
          onBackSpace();
        }
      }}
      onPaste={(e) => {
        e.preventDefault();
        onPaste(e.clipboardData.getData("text"));
      }}
      className="border border-base-300 size-10 rounded-md text-center lg:size-14 mr-2"
    />
  );
};
