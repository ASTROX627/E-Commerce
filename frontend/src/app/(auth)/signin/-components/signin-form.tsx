"use client";

import { IconAlt } from "@/app/_components/icons";
import { TextInput } from "@/app/_components/text-input";
import Link from "next/link";
import { FromProps, SigninInput } from "../../types/from.types";
import { SubmitHandler, useForm } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { SigninSchema } from "../../types/auth.schema";

export const SigninForm: React.FC<FromProps> = ({ className }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SigninInput>({
    resolver: valibotResolver(SigninSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<SigninInput> = (data) => console.log(data);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`container mx-auto mt-8 lg:w-1/2 lg:pr-8 lg:border-r border-base-400 ${className ?? ""}`}
    >
      <h2 className="font-semibold">Sign in</h2>
      <div className="flex flex-col mt-9">
        <TextInput<SigninInput>
          label="Email"
          placeholder="Email address"
          id="email"
          autoComplete="email"
          icon={<IconAlt className="text-base-300" width={24} height={24} />}
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
        <button className="h-14 w-full rounded-md bg-base-300 text-white">
          {isSubmitting ? "SIGNING IN..." : "SIGN IN"}
        </button>
      </div>
    </form>
  );
};
