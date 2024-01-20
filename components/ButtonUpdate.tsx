
import Link from "next/link";
import { MdChangeCircle } from "react-icons/md";

import { IUpdateButtonProps } from "@/types/typeProps";

export const ButtonUpdate = ({ path = "/" }: IUpdateButtonProps) => {
  return (
    <Link className="" href={`/events/${path}`}>
      <MdChangeCircle />
    </Link>
  );
};
