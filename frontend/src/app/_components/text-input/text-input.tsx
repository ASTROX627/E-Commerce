"use client";

import { TextInputType } from "./text-input.types";

export const TextInput: React.FC<TextInputType> = ({
  label,
  placeholder,
  htmlFor,
  inputId,
  icon,
  type,
}) => {
  return (
    <div className="mt-2">
      <label htmlFor={htmlFor} className="text-sm">{label}</label>
      <div className="relative mt-1">
        <input
          type={type}
          id={inputId}
          placeholder={placeholder}
          className="w-full h-10 py-4 px-4.5 border border-base-300 rounded-md text-sm"
        />
        <div className="absolute inset-y-0 flex items-center right-0 pr-2">
          {icon}
        </div>
      </div>
    </div>
  );
};
