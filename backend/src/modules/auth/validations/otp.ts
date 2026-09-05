import z from "zod";

const otpSchema = z
  .string()
  .length(6, "code must be 6 digits")
  .regex(/^\d+$/, "code must be numeric");

export const verifyEmailSchema = z.object({
  email: z.email("must be a valid email"),
  otp: otpSchema,
});

export const resendCodeSchema = z.object({
  email: z.email("must be a valid email"),
});

export const forgotPasswordSchema = z.object({
  email: z.email("must be a valid email"),
});

export const resetPasswordSchema = z.object({
  email: z.email("must be a valid email"),
  otp: otpSchema,
  newPassword: z
    .string()
    .min(8, "password must be at least 8 characters")
    .max(72, "password must be a maximum of 72 characters")
    .regex(/[A-Z]/, "password must be at least have a capital letter")
    .regex(/[a-z]/, "password must be at least have a small letter")
    .regex(/[0-9]/, "password must at least have a number"),
});
