import { toast } from "react-toastify";
import { Dispatch, UnknownAction } from "@reduxjs/toolkit";

import { api } from "./axiosInstance";
import { userSlice } from "@/lib/redux";

export const submitDeleteEvent = async (
  idEvent: string,
  userToken: string | null,
  dispatch: Dispatch<UnknownAction>
) => {
  try {
    dispatch(userSlice.actions.statusApp(true));
    if (!userToken) {
      toast.error("Error: Missing token.");
      return { success: false, message: "Missing token" };
    }

    const response = await api.delete(`events/${idEvent}`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });

    if (response.data.success) {
      toast.success("Event deleted successfully");

      return { success: true, data: response.data.data };
    } else {
      toast.error(
        "Error deleting event:",
        response.data.message || "Unknown error"
      );
      return {
        success: false,
        message: response.data.message || "Unknown error",
      };
    }
  } catch (error) {
    toast.error("Error deleting event");
    return { success: false, message: "Error deleting event" };
  } finally {
    dispatch(userSlice.actions.statusApp(false));
  }
};
