import { api } from "./axiosInstance";

export const submitDeleteEvent = async (idEvent: string) => {
  try {
    const token = localStorage.getItem("authToken");

    if (!token) {
      console.error("Error: Missing token.");
      return { success: false, message: "Missing token" };
    }

    const response = await api.delete(`events/${idEvent}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data.success) {
      console.log("Event deleted successfully:", response.data.data);

      return { success: true, data: response.data.data };
    } else {
      console.error(
        "Error deleting event:",
        response.data.message || "Unknown error"
      );
      return {
        success: false,
        message: response.data.message || "Unknown error",
      };
    }
  } catch (error) {
    console.error("Error deleting event:", error);
    return { success: false, message: "Error deleting event" };
  }
};
