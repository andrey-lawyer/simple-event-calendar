"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { selectEmail, selectToken } from "@/lib/redux";
import { useSelector } from "react-redux";

export const TitleEvents = () => {
  const router = useRouter();
  const token = useSelector(selectToken);
  const emailUser = useSelector(selectEmail);

  useEffect(() => {
    if (router) {
      if (!token) router.push("/register");
    }
  }, [router, token]);

  return (
    <h1 className="font-inter text-center font-medium mb-5 text-xl">
      Calendar of events of {emailUser}
    </h1>
  );
};
