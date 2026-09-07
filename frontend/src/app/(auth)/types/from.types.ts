import * as v from "valibot";
import { SigninSchema, SignupSchema } from "./auth.schema";

export type FromProps = {
  className?: string;
};

export type SignupInput = v.InferInput<typeof SignupSchema>;
export type SigninInput = v.InferInput<typeof SigninSchema>;
