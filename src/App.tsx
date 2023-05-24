import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { UserContextProvider } from "./context/userContext";

import { router } from "./router";
import React from "react";
const queryClient = new QueryClient();

export const App = () => {
  // const [queryClient] = React.useState(() => new QueryClient());
  return (
    <UserContextProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </UserContextProvider>
  );
};
