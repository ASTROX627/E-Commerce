"use client";

import { IconAlt, IconShowPass } from "@/app/_components/icons";
import { TextInput } from "@/app/_components/text-input";
import { FromProps, SignupInput } from "../../types/from.types";
import { SubmitHandler, useForm } from "react-hook-form";
import { SignupSchema } from "../../types/auth.schema";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { api } from "@/core/http-service/http-service";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useAppDispatch } from "@/hooks/redux-hooks";
import { showNotification, showNotifications } from "@/stores/thunks/notification-thunks";

export const SignupForm: React.FC<FromProps> = ({ className }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupInput>({
    resolver: valibotResolver(SignupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const dispatch = useAppDispatch();

  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const onSubmit: SubmitHandler<SignupInput> = async ({
    name,
    email,
    password,
  }) => {
    startTransition(async () => {
      const response = await api.raw("/auth/signup", {
        method: "POST",
        body: { name, email, password },
      });

      if (response.status === 201) {
        dispatch(
          showNotification({
            message: "Signup successfully",
            type: "info",
          })
        )
        router.push("/verify");
      }

    })
  };
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
          id="name"
          type="text"
          autoComplete="name"
          register={register}
          name={"name"}
          errors={errors}
        />
        <TextInput<SignupInput>
          label="Email"
          placeholder="Email address"
          id="email"
          icon={<IconAlt className="text-base-300" width={24} height={24} />}
          type="email"
          autoComplete="email"
          register={register}
          name={"email"}
          errors={errors}
        />
        <TextInput<SignupInput>
          label="Password"
          placeholder="Password"
          id="password"
          icon={
            <IconShowPass className="text-base-300" width={16} height={12} />
          }
          type="password"
          autoComplete="new-password"
          register={register}
          name={"password"}
          errors={errors}
        />
        <TextInput<SignupInput>
          label="Confirm Password"
          placeholder="Confirm password"
          id="confirmPassword"
          icon={
            <IconShowPass className="text-base-300" width={16} height={12} />
          }
          type="password"
          autoComplete="new-password"
          register={register}
          name={"confirmPassword"}
          errors={errors}
        />
      </div>
      <div className="mt-7 text-center">
        <button
          type="submit"
          className="h-14 w-full rounded-md bg-primary-700 text-white"
          disabled={isSubmitting}
        >
          {isPending ? "CREATING ACCOUNT..." : "SIGN UP"}
        </button>
      </div>
    </form>
  );
};
