import { z } from "zod";
export const signinValidataion = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "password must contain at least 6 characters" }),
});

export type SigninFormData = z.infer<typeof signinValidataion>;
