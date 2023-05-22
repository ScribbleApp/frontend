import { Outlet } from "react-router-dom";

import { Header } from "../components/header/Header";
import { MainLayout } from "../components/layout/MainLayout";

import { useQuery } from "@tanstack/react-query";

interface RootProps {}

export const Root = ({}: RootProps) => {
  return (
    <>
      <Header />
      <MainLayout>
        <Outlet />
      </MainLayout>
    </>
  );
};
