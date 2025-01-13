"use client";

import Nav from "../Nav";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "@/api/queryClient";

type MainProps = {
  children: ReactNode;
};

const Main = ({ children }: MainProps) => {
  const path = usePathname();
  const shouldHideNav = path === "/register" || path === "/login";

  return (
    <QueryClientProvider client={queryClient}>
      {!shouldHideNav && <Nav />}
      <main className="main">{children}</main>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default Main;
