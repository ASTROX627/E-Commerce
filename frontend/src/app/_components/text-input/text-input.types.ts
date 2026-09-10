import { InputHTMLAttributes } from "react";
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

type TextInputType = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label: string;
  placeholder: string;
  id: string;
  icon?: React.ReactNode;
  type?: "text" | "password" | "email";
};

export type TextInputProps<TFormValues extends FieldValues> = TextInputType & {
  register: UseFormRegister<TFormValues>;
  name: Path<TFormValues>;
  errors: FieldErrors<TFormValues>;
};
