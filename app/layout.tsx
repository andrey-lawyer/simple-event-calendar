import type { Metadata } from "next";
export const dynamic = "force-dynamic";
import { Open_Sans, Inter } from "next/font/google";

import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import { Header } from "@/components/Header";

import "./globals.css";
import { Providers } from "@/lib/providers";

const open_sans = Open_Sans({
  weight: "300",
  subsets: ["latin"],
  variable: "--font-open-sans",
});

const inter = Inter({
  subsets: ["cyrillic", "latin"],
  display: "swap",
  variable: "--font-inter",
});

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
    <Providers>
      <html lang="en">
        <body className={`${open_sans.variable} ${inter.variable} `}>
          <Header />
          {children}
          <ToastContainer />
        </body>
      </html>
    </Providers>
  );
}
