import type { ReactNode } from "react";

import { Container } from "./Container";
import { SplitScreen } from "./SplitScreen";
import { Sidebar } from "../sidebar/Sidebar";

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <main>
        <Container className="px-5 md:px-10">
          <SplitScreen leftWeight={3} rightWeight={1} className="space-x-10">
            {children}
            <Sidebar />
          </SplitScreen>
        </Container>
      </main>
    </>
  );
};
