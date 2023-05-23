import { type ReactNode, createContext, useState } from "react";
import { TUser } from "../types/TUser";

export type UserContextType = {
  isLoggedIn: boolean;
  token: string;
  userId: number;
  updateToken: (updToken: string) => void;
  updateIsLoggedIn: (value: boolean) => void;
  updateUserId: (id: number) => void;
};

export const UserContext = createContext<UserContextType>({
  isLoggedIn: false,
  token: "",
  userId: 0,
  updateToken: () => {},
  updateIsLoggedIn: () => {},
  updateUserId: () => {},
});

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userId, setUserId] = useState<number>(0);

  const contextValue = {
    isLoggedIn,
    token,
    userId,

    updateToken: (updToken: string) => setToken(updToken),
    updateIsLoggedIn: (value: boolean) => setIsLoggedIn(value),

    updateUserId: (id: number) => setUserId(id),
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
