"use client";

import { IconAlt, IconShowPass } from "@/app/_components/icons";
import { TextInput } from "@/app/_components/text-input";
import { FromProps } from "../../types/from.types";

export const SignupForm: React.FC<FromProps> = ({ className }) => {
  return (
    <form
      className={`container mx-auto mt-8 lg:w-1/2 lg:pl-8 lg:border-l border-base-400 ${className ?? ""}`}
    >
      <h2 className="font-semibold">Sign up</h2>
      <div className="flex flex-col mt-9">
        <TextInput
          label="Name"
          placeholder="Full name"
          htmlFor="name"
          inputId="name"
          type="text"
        />
        <TextInput
          label="Email"
          placeholder="Email address"
          htmlFor="email"
          inputId="email"
          icon={<IconAlt className="text-base-300" width={24} height={24} />}
          type="text"
        />
        <TextInput
          label="Password"
          placeholder="Password"
          htmlFor="password"
          inputId="password"
          icon={
            <IconShowPass className="text-base-300" width={16} height={12} />
          }
          type="password"
        />
        <TextInput
          label="ConfirmPassword"
          placeholder="Confirm password"
          htmlFor="confirm-password"
          inputId="confirm-password"
          icon={
            <IconShowPass className="text-base-300" width={16} height={12} />
          }
          type="password"
        />
      </div>
      <div className="mt-7 text-center">
        <button className="h-14 w-full rounded-md bg-primary-700 text-white">
          SIGN UP
        </button>
      </div>
    </form>
  );
};
