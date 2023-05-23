import axios from "axios";
import type { SignupFormData } from "../types/SignupFormData";
import type { SigninFormData } from "../types/SigninFormData";
import type { TPost } from "../types/TPost";
import type { TUser } from "../types/TUser";
import type { TPostDetail } from "../types/TPostDetail";
import type { TPostPayload } from "../types/TPostPayload";
import { TUserDetail } from "../types/TUserDetail";

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
  } else return { email: null };
};

export const getAllPosts = async () => {
  const { data } = await api.get("/posts");
  return data as TPost[];
};

export const getPostById = async (id: string) => {
  const { data } = await api.get("/posts/" + id);
  return data as TPostDetail;
};

export const createNewPost = async (payload: TPostPayload) => {
  const token = localStorage.getItem("jwt");
  const { data } = await api.post("/posts", payload, {
    headers: {
      Authorization: `${token}`,
    },
  });

  return data as TPost;
};

export const getUserById = async (id: string) => {
  const { data } = await api.get("/users/" + id);
  return data as TUserDetail;
};
