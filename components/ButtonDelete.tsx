"use client";

import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { MdDelete } from "react-icons/md";

import { submitDeleteEvent } from "@/services/apiDeleteEvent";
import { selectStatus, selectToken } from "@/lib/redux";

import { Loader } from "./Loader";

import { IDeleteButtonProps } from "@/types/typeProps";

export const ButtonDelete = ({ idEvent = "" }: IDeleteButtonProps) => {
  const router = useRouter();
  const userToken = useSelector(selectToken);
  const loading = useSelector(selectStatus);
  const dispatch = useDispatch();
  const handleDelete = async () => {
    try {
      const deleteResult = await submitDeleteEvent(
        idEvent,
        userToken,
        dispatch
      );

      if (deleteResult.success) {
        console.log("Event deleted successfully");
        router.refresh();
      } else {
        throw new Error(
          `Error deleting event: ${deleteResult.message || "Unknown error"}`
        );
      }
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
    }
  };

  return (
    <>
      <button type="button" className="" onClick={handleDelete}>
        <MdDelete />
      </button>
      {loading && <Loader />}
    </>
  );
};
