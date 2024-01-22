"use client";

import Link from "next/link";
import { useEffect } from "react";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import { checkToken } from "@/services/checkToken";
import { selectEmail } from "@/lib/redux";

export default function Home() {
  const router = useRouter();
  const emailUser = useSelector(selectEmail);

  const dispatch = useDispatch();
  useEffect(() => {
    if (router) {
      checkToken(router, dispatch);
    }
  }, [dispatch, router]);

  return (
    <main className="container  pt-[72px] bg-blue-200 h-[100vh]">
      <div className="relative">
        <div className="">
          {emailUser && (
            <h1 className="font-inter text-center font-medium my-10  text-xl px-4 leading-9 ">
              {emailUser}
              <span className="block">
                Welcome to the Event Calendar! This is the main page where you
                can manage and view your events. Explore your schedule, add or
                remove events, and stay organized. We hope you have a great
                experience!
              </span>
            </h1>
          )}
          <Link
            className="flex items-center justify-center gap-2 font-inter hover:text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out"
            href="/events"
          >
            <FaRegArrowAltCircleRight className="w-10 h-10" />
            <span className="text-lg">Go to Calendar</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
