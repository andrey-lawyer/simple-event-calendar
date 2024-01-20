"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { checkUserAndToken } from "@/services/checkUserAndToken";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (router) checkUserAndToken(router);
  }, [router]);

  return <main className="container  mt-[50px]">This is main page/////</main>;
}
