"use client";

import { IconAlt, IconShowPass } from "@/app/_components/icons";
import { TextInput } from "@/app/_components/text-input";
import { FromProps, SignupInput } from "../../types/from.types";
import { SubmitHandler, useForm } from "react-hook-form";
import { SignupSchema } from "../../types/auth.schema";
import { valibotResolver } from "@hookform/resolvers/valibot";

export const SignupForm: React.FC<FromProps> = ({ className }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupInput>({
    resolver: valibotResolver(SignupSchema),
  });
  const onSubmit: SubmitHandler<SignupInput> = (data) => console.log(data);
  return (
    <form
      className={`container mx-auto mt-8 lg:w-1/2 lg:pl-8 lg:border-l border-base-400 ${className ?? ""}`}
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="font-semibold">Sign up</h2>
      <div className="flex flex-col mt-9">
        <TextInput<SignupInput>
          label="Name"
          placeholder="Full name"
          htmlFor="name"
          inputId="name"
          type="text"
          register={register}
          name={"name"}
          errors={errors}
        />
        <TextInput<SignupInput>
          label="Email"
          placeholder="Email address"
          htmlFor="email"
          inputId="email"
          icon={<IconAlt className="text-base-300" width={24} height={24} />}
          type="text"
          register={register}
          name={"email"}
          errors={errors}
        />
        <TextInput<SignupInput>
          label="Password"
          placeholder="Password"
          htmlFor="password"
          inputId="password"
          icon={
            <IconShowPass className="text-base-300" width={16} height={12} />
          }
          type="password"
          register={register}
          name={"password"}
          errors={errors}
        />
        <TextInput<SignupInput>
          label="ConfirmPassword"
          placeholder="Confirm password"
          htmlFor="confirm-password"
          inputId="confirm-password"
          icon={
            <IconShowPass className="text-base-300" width={16} height={12} />
          }
          type="password"
          register={register}
          name={"confirmPassword"}
          errors={errors}
        />
      </div>
      <div className="mt-7 text-center">
        <button
          type="submit"
          className="h-14 w-full rounded-md bg-primary-700 text-white"
        >
          SIGN UP
        </button>
      </div>
    </form>
  );
};
