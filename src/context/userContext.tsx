import { type ReactNode, createContext, useState } from "react";

export type UserContextType = {
  isLoggedIn: boolean;
  token: string;

  updateToken: (updToken: string) => void;
  updateIsLoggedIn: (value: boolean) => void;
};

export const UserContext = createContext<UserContextType>({
  isLoggedIn: false,
  token: "",
  updateToken: () => {},
  updateIsLoggedIn: () => {},
});

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const contextValue = {
    isLoggedIn,
    token,

    updateToken: (updToken: string) => setToken(updToken),
    updateIsLoggedIn: (value: boolean) => setIsLoggedIn(value),
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
