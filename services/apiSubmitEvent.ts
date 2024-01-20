import { toast } from "react-toastify";
import { api } from "./axiosInstance";
import { IEventForm } from "@/types/eventForm";

export const submitEvent = async (formattedValues: IEventForm) => {
  try {
    const token = localStorage.getItem("authToken");
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
      toast.success("Event created successfully", response.data.data);
      return { success: true, data: response.data.data };
    }
  } catch (error) {
    toast.error("Error creating event");
    return { success: false, message: "Error creating event" };
  }
};

export const updateEvent = async (
  eventId: string | undefined | string[],
  formattedValues: IEventForm
) => {
  try {
    const token = localStorage.getItem("authToken");
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
      console.log("Event updated successfully:", response.data.data);
      return { success: true, data: response.data.data };
    }
  } catch (error) {
    console.error("Error updating event:", error);
    return { success: false, message: "Error updating event" };
  }
};
