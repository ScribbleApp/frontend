import { useMutation } from "@tanstack/react-query";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";

import { signUp } from "../../api";
import { UserContext } from "../../context/userContext";

import { Button } from "../ui/Button";
import { PopUp } from "../ui/PopUp";
import {
  signupValidataion,
  type SignupFormData,
} from "../../types/SignupFormData";

interface SignUpProps {}

export const SignUp = ({}: SignUpProps) => {
  const { updateIsLoggedIn, updateToken, updateUserId, updateIsAdmin } =
    useContext(UserContext);

  const { mutateAsync, data } = useMutation({
    mutationFn: async (payload: SignupFormData) => await signUp(payload),
    onSuccess: (data) => {
      updateToken(data.token);
      updateIsLoggedIn(true);
      updateUserId(data.data.data.id);
      updateIsAdmin(data.data.data.admin);
      localStorage.setItem("jwt", data.token);
    },
  });

  // console.log(data);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignupFormData>({ resolver: zodResolver(signupValidataion) });

  const onSubmitHandler: SubmitHandler<SignupFormData> = async (formData) => {
    await mutateAsync(formData);
  };

  return (
    <PopUp
      button={<Button>sign up</Button>}
      popUpTitle="Create an Account!"
      onClose={() => reset()}
    >
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <div className="mb-5 flex flex-col space-y-1">
          <label htmlFor="name" className="text-sm font-medium">
            name
          </label>
          <input
            type="text"
            className="form-input"
            id="name"
            placeholder="john doe"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>
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
          <Button>sign up</Button>
        </div>
      </form>
    </PopUp>
  );
};
