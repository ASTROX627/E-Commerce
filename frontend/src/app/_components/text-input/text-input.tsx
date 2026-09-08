"use client";

import { useState } from "react";
import { IconEyeOff, IconShowPass } from "@/app/_components/icons";
import { TextInputProps } from "./text-input.types";
import { FieldValues, get } from "react-hook-form";

export const TextInput = <TFormValues extends FieldValues>({
  label,
  placeholder,
  htmlFor,
  inputId,
  icon,
  type,
  name,
  register,
  errors,
  ...props
}: TextInputProps<TFormValues>) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const error = get(errors, name);
  const hasError = !!error;

  return (
    <div className="mt-2">
      <label htmlFor={htmlFor} className="text-sm">
        {label}
      </label>

      <div className="relative mt-1">
        <input
          type={isPassword && !showPassword ? "password" : "text"}
          id={inputId}
          placeholder={placeholder}
          {...register(name)}
          {...props}
          className={`w-full h-10 py-4 px-4.5 border border-base-300 rounded-md text-sm ${hasError ? "border-notification" : ""}`}
        />

        <div className="absolute inset-y-0 right-0 flex items-center pr-2">
          {isPassword ? (
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <IconEyeOff className="text-base-300" width={22} height={16} />
              ) : (
                <IconShowPass
                  className="text-base-300"
                  width={22}
                  height={16}
                />
              )}
            </button>
          ) : (
            icon
          )}
        </div>
      </div>
      {hasError && (
        <p className="mt-1 text-sm text-notification">{error.message}</p>
      )}
    </div>
  );
};
