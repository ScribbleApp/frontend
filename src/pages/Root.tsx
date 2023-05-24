import { Outlet } from "react-router-dom";

import { Header } from "../components/header/Header";
import { MainLayout } from "../components/layout/MainLayout";

import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../api";

import { UserContext } from "../context/userContext";
import { useContext } from "react";

interface RootProps {}

export const Root = ({}: RootProps) => {
  const { updateIsLoggedIn, updateUserId, updateIsAdmin } =
    useContext(UserContext);

  const { isLoading } = useQuery({
    queryKey: ["current_user"],
    queryFn: async () => await getCurrentUser(),
    onSuccess(data) {
      console.log(data);

      if (data.email) {
        updateIsLoggedIn(true);
        updateUserId(data.id);
        updateIsAdmin(data.admin);
      } else {
        localStorage.clear();
        updateIsLoggedIn(false);
      }
    },
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <p>loading...</p>;

  return (
    <>
      <Header />
      <MainLayout>
        <Outlet />
      </MainLayout>
    </>
  );
};
