import { useMutation } from "@tanstack/react-query";
import { signUp } from "./";

import { SignupFormData } from "../types/SignupFormData";

export const signUpMutation = useMutation({
  mutationFn: async (payload: SignupFormData) => await signUp(payload),
});
