import { toast } from "react-toastify";
import { api } from "./axiosInstance";

export const validateToken = async (token: string | null) => {
  try {
    const response = await api.post("validate-token", null, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.data.success) {
      toast.error(
        "Token validation failed:",
        response.data.message || "Unknown error"
      );
      return { success: false, message: response.data.message };
    } else {
      return {
        success: true,
        exists: response.data.exists,
        message: response.data.message,
      };
    }
  } catch (error) {
    toast.error("Token validation error:");
  }
};

export async function checkUserByEmail(email: string | null) {
  try {
    const response = await api.post("check-user", { email });
    return response.data.exists;
  } catch (error) {
   toast.error("Error checking user:");
  }
}
