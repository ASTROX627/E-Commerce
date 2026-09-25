import { Ref } from "react";

export type OtpInputProps = {
  value: string;
  onChange: (value: string) => void;
  onBackSpace: () => void;
  onPaste: (text: string) => void;
  inputRef?: Ref<HTMLInputElement>;
};
