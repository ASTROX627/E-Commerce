"use client";

import { useState } from "react";
import { IconEyeOff, IconShowPass } from "@/app/_components/icons";
import { TextInputType } from "./text-input.types";

export const TextInput: React.FC<TextInputType> = ({
  label,
  placeholder,
  htmlFor,
  inputId,
  icon,
  type,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";

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
          className="w-full h-10 py-4 px-4.5 border border-base-300 rounded-md text-sm"
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
    </div>
  );
};
