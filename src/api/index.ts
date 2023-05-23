import axios from "axios";
import type { SignupFormData } from "../types/SignupFormData";
import type { SigninFormData } from "../types/SigninFormData";
import type { TPost } from "../types/TPost";
import type { TUser } from "../types/TUser";
import type { TPostDetail } from "../types/TPostDetail";
import type { TPostPayload } from "../types/TPostPayload";
import { TUserDetail } from "../types/TUserDetail";
import { TCategory } from "../types/TCategory";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

export const signUp = async (payload: SignupFormData) => {
  const { data, headers } = await api.post("/signup", { user: payload });
  return {
    data,
    token: headers.authorization,
  } as {
    data: { data: TUser };
    token: string;
  };
};

export const signIn = async (payload: SigninFormData) => {
  const { data, headers } = await api.post("/login", { user: payload });
  return {
    data,
    token: headers.authorization,
  } as {
    data: { data: TUser };
    token: string;
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
    try {
      const { data, status } = await api.get("/current_user", {
        headers: {
          Authorization: `${token}`,
        },
      });
      console.log(status);
      if (status === 401) {
        localStorage.clear();
        return { email: null };
      }

      return data as TUser;
    } catch (e) {
      console.log(e);
      return { email: null };
    }
  } else return { email: null };
};

export const getAllPosts = async (categories: string = "") => {
  const { data } = await api.get("/posts?categories=" + categories);
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

export const searchPosts = async (search: string) => {
  const { data } = await api.get("/posts?search=" + search);
  return data as TPost[];
};

export const getSavedPosts = async () => {
  const token = localStorage.getItem("jwt");
  const { data } = await api.get("/users/saved", {
    headers: {
      Authorization: `${token}`,
    },
  });
  return data as { id: number; post: TPost }[];
};

export const addToSavedPosts = async (id: number) => {
  const token = localStorage.getItem("jwt");
  const { data } = await api.post(
    "/users/saved",
    { post_id: id },
    {
      headers: {
        Authorization: `${token}`,
      },
    }
  );

  return data;
};

export const removeFromSavedPosts = async (id: number) => {
  const token = localStorage.getItem("jwt");
  const { data } = await api.delete("/users/saved/" + id, {
    headers: {
      Authorization: `${token}`,
    },
  });

  return data;
};

export const getAllCategories = async () => {
  const { data } = await api.get("/posts/categories");
  return data as TCategory[];
};

export const getSubscriptions = async (id: number) => {
  const { data } = await api.get("/subscriptions/" + id);
  return data as {
    id: number;
    userId: number;
    email: string;
  }[];
};

export const subscribe = async (id: number) => {
  const token = localStorage.getItem("jwt");
  const { data } = await api.post(
    "/subscriptions",
    { user_id: id },
    {
      headers: {
        Authorization: `${token}`,
      },
    }
  );

  return data;
};
