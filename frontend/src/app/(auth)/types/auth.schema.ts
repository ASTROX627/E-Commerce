import * as v from "valibot";

const EmailSchema = v.pipe(
  v.string("email is required"),
  v.trim(),
  v.email("please enter a valid email"),
);

const NameSchema = v.pipe(v.string(), v.minLength(1, "name is required"));

export const SignupSchema = v.pipe(
  v.object({
    email: EmailSchema,
    name: NameSchema,
    password: v.pipe(
      v.string(),
      v.minLength(1, "password is required"),
      v.minLength(8, "password must be at least 8 characters"),
      v.regex(/[A-Z]/, "password must be at least have a capital letter"),
      v.regex(/[a-z]/, "password must be at least have a small letter"),
      v.regex(/[0-9]/, "password must at least have a number"),
    ),
    confirmPassword: v.pipe(v.string(), v.minLength(1, "confirm password is required"))
  }),
  v.forward(
    v.partialCheck(
      [["password"], ["confirmPassword"]],
      (input) => input.password === input.confirmPassword,
      "passwords do not match",
    ),
    ["confirmPassword"],
  ),
);

export const SigninSchema = v.object({
  email: EmailSchema,
  password: v.pipe(v.string(), v.minLength(1, "password is required")),
});
