import { useMutation } from "@tanstack/react-query";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";

import { signIn } from "../../api";
import { UserContext } from "../../context/userContext";

import {
  signinValidataion,
  type SigninFormData,
} from "../../types/SigninFormData";

import { Button } from "../ui/Button";
import { PopUp } from "../ui/PopUp";

interface SignInProps {}

export const SignIn = ({}: SignInProps) => {
  const { updateIsLoggedIn, updateToken, updateUserId, updateIsAdmin } =
    useContext(UserContext);

  const { mutateAsync, data, isLoading } = useMutation({
    mutationFn: async (payload: SigninFormData) => await signIn(payload),
    onSuccess: (data) => {
      // console.log(data);
      updateIsLoggedIn(true);
      updateUserId(data.data.data.id);
      updateToken(data.token);
      updateIsAdmin(data.data.data.admin);
      localStorage.setItem("jwt", data.token);
    },
  });

  // console.log("signin:", data);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SigninFormData>({ resolver: zodResolver(signinValidataion) });

  const onSubmitHandler: SubmitHandler<SigninFormData> = async (formData) => {
    await mutateAsync(formData);
  };

  return (
    <PopUp
      button={
        <Button intent={"secondary"} padding={"none"}>
          sign in
        </Button>
      }
      popUpTitle="Welcome Back!"
      onClose={() => {}}
    >
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <div className="mb-5 flex flex-col space-y-1">
          <label htmlFor="email" className="text-sm font-medium">
            email
          </label>
          <input
            type="email"
            className="form-input"
            id="email"
            placeholder="johndoe@g.com"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>
        <div className="mb-5 flex flex-col space-y-1">
          <label htmlFor="password" className="text-sm font-medium">
            password
          </label>
          <input
            type="password"
            className="form-input"
            id="password"
            placeholder="••••••"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-sm text-red-600">{errors.password.message}</p>
          )}
        </div>
        <div className="flex justify-end">
          <Button>{isLoading ? "..." : "sign in"}</Button>
        </div>
      </form>
    </PopUp>
  );
};
