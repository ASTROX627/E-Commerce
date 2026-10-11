import { api } from "@/core/http-service/http-service";
import { SignupInput, SigninInput } from "../../app/(auth)/types/from.types";
export const authApi = {
  signup: ({ name, email, password }: SignupInput) =>
    api("/auth/signup", { method: "POST", body: { name, email, password } }),

  signin: (data: SigninInput) =>
    api("/auth/signin", { method: "POST", body: data }),
};
