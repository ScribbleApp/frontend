import axios from "axios";
import { SignupFormData } from "../types/SignupFormData";
import { SigninFormData } from "../types/SigninFormData";

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

// export const getCurrentUser = async () => {
//   const {} = await api.get
// }
