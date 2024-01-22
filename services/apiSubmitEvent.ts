import { toast } from "react-toastify";
import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

import { api } from "./axiosInstance";
import { userSlice } from "@/lib/redux";

import { IEventForm } from "@/types/eventForm";
import { IFormikValue } from "@/types/extendTypeFormik";

export const submitEvent = async (
  formattedValues: IEventForm,
  actions: IFormikValue,
  token: string | null,

  dispatch: Dispatch<UnknownAction>
) => {
  try {
    dispatch(userSlice.actions.statusApp(true));
    if (!token) {
      toast.error("Error: Missing token.");
      return { success: false, message: "Missing token" };
    }

    const response = await api.post("events", formattedValues, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.data.success) {
      toast.error(
        "Error creating event:",
        response.data.message || "Unknown error"
      );
      return {
        success: false,
        message: response.data.message || "Unknown error",
      };
    } else {
      toast.success("Event created successfully");
      actions.resetForm();
      return { success: true, data: response.data.data };
    }
  } catch (error) {
    toast.error("Error creating event");
    return { success: false, message: "Error creating event" };
  } finally {
    dispatch(userSlice.actions.statusApp(false));
  }
};

export const updateEvent = async (
  eventId: string | undefined | string[],
  formattedValues: IEventForm,
  actions: IFormikValue,
  router: AppRouterInstance,
  token: string | null,
  dispatch: Dispatch<UnknownAction>
) => {
  try {
    dispatch(userSlice.actions.statusApp(true));
    if (!token) {
      console.error("Error: Missing token.");
      return { success: false, message: "Missing token" };
    }

    const response = await api.put(`events/${eventId}`, formattedValues, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.data.success) {
      console.error(
        "Error updating event:",
        response.data.message || "Unknown error"
      );
      return {
        success: false,
        message: response.data.message || "Unknown error",
      };
    } else {
      toast.success("Event updated successfully:");
      actions.resetForm();
      router.push("/events");
      return { success: true, data: response.data.data };
    }
  } catch (error) {
    console.error("Error updating event:", error);
    return { success: false, message: "Error updating event" };
  } finally {
    dispatch(userSlice.actions.statusApp(false));
  }
};
