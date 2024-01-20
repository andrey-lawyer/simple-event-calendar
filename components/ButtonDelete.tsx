"use client";

import { submitDeleteEvent } from "@/services/apiDeleteEvent";
import { MdDelete } from "react-icons/md";

import { IDeleteButtonProps } from "@/types/typeProps";

export const ButtonDelete = ({ idEvent = "" }: IDeleteButtonProps) => {
  const handleDelete = async () => {
    try {
      const deleteResult = await submitDeleteEvent(idEvent);

      if (deleteResult.success) {
        console.log("Event deleted successfully");
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
    <button type="button" className="" onClick={handleDelete}>
      <MdDelete />
    </button>
  );
};
