import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Header } from "@/components/Header";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Simple calendar of events",
  description:
    "A simple event calendar app built with Next.js, Redux, and MongoDB stack",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <div>ничего не понятно...</div>
        {children}
      </body>
    </html>
  );
}
