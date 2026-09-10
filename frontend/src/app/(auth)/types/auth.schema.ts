import * as v from "valibot";

const EmailSchema = v.pipe(
  v.string("Email is required"),
  v.trim(),
  v.email("Please enter a valid email"),
);

const NameSchema = v.pipe(
  v.string("Name is required"),
  v.trim(),
  v.minLength(1, "Name is required"),
);

const PasswordSchema = v.pipe(
  v.string("Password is required"),
  v.minLength(8, "Password must be at least 8 characters"),
  v.regex(/[A-Z]/, "Password must contain an uppercase letter"),
  v.regex(/[a-z]/, "Password must contain a lowercase letter"),
  v.regex(/[0-9]/, "Password must contain a number"),
);

export const SignupSchema = v.pipe(
  v.object({
    name: NameSchema,
    email: EmailSchema,
    password: PasswordSchema,
    confirmPassword: v.pipe(
      v.string("Confirm password is required"),
      v.minLength(1, "Confirm password is required"),
    ),
  }),
  v.forward(
    v.partialCheck(
      [["password"], ["confirmPassword"]],
      ({ password, confirmPassword }) => password === confirmPassword,
      "Passwords do not match",
    ),
    ["confirmPassword"],
  ),
);

export const SigninSchema = v.object({
  email: EmailSchema,
  password: v.pipe(
    v.string("Password is required"),
    v.minLength(1, "Password is required"),
  ),
});
