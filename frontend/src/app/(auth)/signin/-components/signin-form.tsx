"use client";

import { IconAlt } from "@/app/_components/icons";
import { TextInput } from "@/app/_components/text-input";
import Link from "next/link";
import { FromProps } from "../../types/from.types";

export const SigninForm: React.FC<FromProps> = ({ className }) => {
  return (
    <form
      className={`container mx-auto mt-8 lg:w-1/2 lg:pr-8 lg:border-r border-base-400 ${className ?? ""}`}
    >
      <h2 className="font-semibold">Sign in</h2>
      <div className="flex flex-col mt-9">
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
          type="password"
        />
      </div>
      <div className="mt-7">
        <Link
          href="/forgot-password"
          className="text-primary-700 underline text-xs"
        >
          Forgot password
        </Link>
      </div>
      <div className="mt-7 text-center">
        <button className="h-14 w-full rounded-md bg-base-300 text-white">
          SIGN IN
        </button>
      </div>
    </form>
  );
};
