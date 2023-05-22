import axios from "axios";
import { SignupFormData } from "../types/SignupFormData";
import { SigninFormData } from "../types/SigninFormData";
import { TPost } from "../types/TPost";
import { TUser } from "../types/TUser";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

export const signUp = async (payload: SignupFormData) => {
  const { data, headers } = await api.post("/signup", { user: payload });
  return {
    data,
    token: headers.authorization,
  };
};

export const signIn = async (payload: SigninFormData) => {
  const { data, headers } = await api.post("/login", { user: payload });
  return {
    data,
    token: headers.authorization,
  };
};

export const signOut = async () => {
  const token = localStorage.getItem("jwt");
  const { data } = await api.delete("/logout", {
    headers: {
      Authorization: `${token}`,
    },
  });

  localStorage.clear();
  return data;
};

export const getCurrentUser = async () => {
  const token = localStorage.getItem("jwt");
  if (token) {
    const { data } = await api.get("/current_user", {
      headers: {
        Authorization: `${token}`,
      },
    });

    return data as TUser;
  } else return {};
};

export const getAllPosts = async () => {
  const { data } = await api.get("/posts");
  return data as TPost[];
};
