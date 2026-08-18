import z from "zod";

export const signupSchema = z.object({
  name: z.string().min(1, "name is required"),
  email: z.email("must be a valid email"),
  password: z
    .string()
    .min(8, "password must be at least 8 characters")
    .max(72, "password must be a maximum of 72 characters")
    .regex(/[A-Z]/, "password must be at least have a capital letter")
    .regex(/[a-z]/, "password must be at least have a small letter")
    .regex(/[0-9]/, "password must at least have a number"),
});
