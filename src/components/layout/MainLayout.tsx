import type { ReactNode } from "react";

import { Container } from "./Container";

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <main>
        <Container className="px-5 md:px-10">{children}</Container>
      </main>
    </>
  );
};
