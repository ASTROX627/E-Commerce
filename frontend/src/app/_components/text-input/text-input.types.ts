import { InputHTMLAttributes } from "react";
import {
  DeepMap,
  FieldError,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

export type TextInputType = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  placeholder: string;
  htmlFor: "email" | "password" | "confirm-password" | "name";
  inputId: "email" | "password" | "confirm-password" | "name";
  icon?: React.ReactNode;
  type: "text" | "password";
};

export type TextInputProps<TFormValues extends FieldValues> = TextInputType & {
  register: UseFormRegister<TFormValues>;
  name: Path<TFormValues>;
  rules?: RegisterOptions<TFormValues, Path<TFormValues>>;
  errors: Partial<DeepMap<TFormValues, FieldError>>;
};
