"use client";

import { IconAlt } from "@/app/_components/icons";
import { TextInput } from "@/app/_components/text-input";
import Link from "next/link";
import { FromProps, SigninInput } from "../../types/from.types";
import { useForm } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { SigninSchema } from "../../types/auth.schema";
import { useSignin } from "@/hooks/auth/use-signin";

export const SigninForm: React.FC<FromProps> = ({ className }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninInput>({
    resolver: valibotResolver(SigninSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {mutate, isPending} = useSignin();

  return (
    <form
      onSubmit={handleSubmit((data) => mutate(data))}
      className={`container mx-auto mt-8 lg:w-1/2 lg:pr-8 lg:border-r border-base-400 ${className ?? ""}`}
    >
      <h2 className="font-semibold">Sign in</h2>
      <div className="flex flex-col mt-9">
        <TextInput<SigninInput>
          label="Email"
          placeholder="Email address"
          id="email"
          autoComplete="email"
          icon={<IconAlt className="text-neutral" width={24} height={24} />}
          type="email"
          register={register}
          name={"email"}
          errors={errors}
        />
        <TextInput<SigninInput>
          label="Password"
          placeholder="Password"
          id="password"
          type="password"
          autoComplete="new-password"
          register={register}
          name={"password"}
          errors={errors}
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
        <button className="h-14 w-full rounded-md bg-neutral text-white">
          {isPending ? "SIGNING IN..." : "SIGN IN"}
        </button>
      </div>
    </form>
  );
};
