import { api } from "./axiosInstance";

export const validateToken = async (token: string | null) => {
  try {
    const response = await api.post("validate-token", null, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.data.success) {
      console.error(
        "Token validation failed:",
        response.data.message || "Unknown error"
      );
      return { success: false, message: response.data.message };
    } else {
      console.log("Token validated successfully");
      return {
        success: true,
        exists: response.data.exists,
        message: response.data.message,
      };
    }
  } catch (error) {
    console.error("Token validation error:", error);
  }
};

export async function checkUserByEmail(email: string | null) {
  try {
    const response = await api.post("check-user", { email });
    return response.data.exists;
  } catch (error) {
    console.error("Error checking user:", error);
  }
}
