import { api } from "./axiosInstance";

export const validateToken = async (token: string | null) => {
  try {
    const response = await api.post("validate-token", null, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.data.success) {
      return { success: false, message: response.data.message };
    } else {
      return {
        success: true,
        exists: response.data.exists,
        message: response.data.message,
        email: response.data.email,
      };
    }
  } catch (error) {
    console.error("Please go through the registration and/or login process");
  }
};
