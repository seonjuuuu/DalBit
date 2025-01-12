import { headers } from "next/headers";
import type { Metadata } from "next";
import Nav from "@/components/Nav";
import "./globals.scss";

export const metadata: Metadata = {
  title: "Dalbit- 달빛",
  description: "Dalbit"
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const reqHeaders = await headers();
  const referer = reqHeaders.get("referer");
  const pathname = referer ? new URL(referer).pathname : "";

  const shouldHideNav = pathname === "/login" || pathname === "/register";

  return (
    <html lang="en">
      <body>
        {!shouldHideNav && <Nav />}
        <main className="main">{children}</main>
      </body>
    </html>
  );
}
