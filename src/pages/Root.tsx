import { Outlet } from "react-router-dom";

import { Header } from "../components/header/Header";
import { MainLayout } from "../components/layout/MainLayout";

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
