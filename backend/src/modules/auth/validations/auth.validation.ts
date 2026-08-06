import z from "zod";

export const signupSchema = z.object({
  name: z.string().min(1, "name is required"),
  email: z.email("must be a valid email"),
  password: z.string().min(6, "password must be at least 6 characters"),
});
