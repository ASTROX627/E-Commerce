import z from "zod";

export const loginSchema = z.object({
  email: z.email("must be a valid email"),
  password: z.string().min(8, "password must be at least 8 characters"),
});
