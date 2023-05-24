import { type ReactNode, createContext, useState } from "react";
import { TUser } from "../types/TUser";

export type UserContextType = {
  isLoggedIn: boolean;
  token: string;
  userId: number;
  isAdmin: boolean;
  updateToken: (updToken: string) => void;
  updateIsLoggedIn: (value: boolean) => void;
  updateUserId: (id: number) => void;
  updateIsAdmin: (value: boolean) => void;
};

export const UserContext = createContext<UserContextType>({
  isLoggedIn: false,
  token: "",
  userId: 0,
  isAdmin: false,
  updateToken: () => {},
  updateIsLoggedIn: () => {},
  updateUserId: () => {},
  updateIsAdmin: () => {},
});

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userId, setUserId] = useState<number>(0);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const contextValue = {
    isLoggedIn,
    token,
    userId,
    isAdmin,

    updateToken: (updToken: string) => setToken(updToken),
    updateIsLoggedIn: (value: boolean) => setIsLoggedIn(value),

    updateUserId: (id: number) => setUserId(id),
    updateIsAdmin: (value: boolean) => setIsAdmin(value),
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
