import type { Metadata } from "next";
import "./globals.scss";
import Main from "@/components/common/Main";

export const metadata: Metadata = {
  title: "Dalbit- 달빛",
  description: "Dalbit"
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Main children={children} />
      </body>
    </html>
  );
}
