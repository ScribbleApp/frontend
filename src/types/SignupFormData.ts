import { z } from "zod";
export const signupValidataion = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "password must contain at least 6 characters" }),
});

export type SignupFormData = z.infer<typeof signupValidataion>;
