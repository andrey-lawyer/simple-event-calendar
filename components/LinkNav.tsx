"use client";

import Link from "next/link";
import { useSelector } from "react-redux";

import { selectToken } from "@/lib/redux";
import { ILinkProps } from "@/types/typeProps";

export const LinkNav = ({ href, title }: ILinkProps) => {
  const userToken = useSelector(selectToken);
  if (!userToken) {
    if (href === "/events" || href === "/") return null;
  }
  return (
    <Link
      className="inline-block px-2 md:px-4  py-2 md:text-base text-xs font-bold text-center no-underline rounded-md bg-white text-gray-700 transition duration-300 ease-in-out hover:bg-gray-700 hover:text-white"
      href={href}
    >
      {title}
    </Link>
  );
};
