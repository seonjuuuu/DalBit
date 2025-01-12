"use client"; // 클라이언트 컴포넌트로 지정

import Nav from "../Nav";
import { ReactNode, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

type MainProps = {
  children: ReactNode;
};

const Main = ({ children }: MainProps) => {
  const path = usePathname();
  const shouldHideNav = path === "/register" || path === "/login";

  return (
    <>
      {!shouldHideNav && <Nav />}
      <main className="main">{children}</main>
    </>
  );
};

export default Main;
