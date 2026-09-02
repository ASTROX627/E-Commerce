"use client";

import { IconAlt, IconShowPass } from "@/app/_components/icons";
import { TextInput } from "@/app/_components/text-input";

export const SignupForm: React.FC = () => {
  return (
    <form className="mt-8">
      <h2 className="font-semibold">Sign in</h2>
      <div className="flex flex-col mt-9">
        <TextInput
          label="email"
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
        <button className="h-14 w-full rounded-md bg-base-300 text-white">
          SIGN IN
        </button>
      </div>
    </form>
  );
}
