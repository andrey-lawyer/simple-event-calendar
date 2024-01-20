import { FormikHelpers } from "formik";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

import { api } from "./axiosInstance";
import { IValue } from "@/types/valueForm";
import { toast } from "react-toastify";

export const register = async (
  values: IValue,
  actions: FormikHelpers<IValue>,
  router: AppRouterInstance
): Promise<{ success: boolean; message?: string }> => {
  try {
    const response = await api.post(`auth/register`, values);

    if (!response.data.success) {
      toast.error(
        "Registration failed:",
        response.data.message || "Unknown error"
      );
    } else {
      toast.success("Registration successful");
      localStorage.setItem("registeredUserEmail", values.email);
      actions.resetForm();
      router.push("/login");
    }

    return response.data;
  } catch (error) {
    toast.error("Registration failed");
    return { success: false, message: "Registration failed" };
  }
};

export const login = async (
  values: IValue,
  actions: FormikHelpers<IValue>,
  router: AppRouterInstance
): Promise<{
  success: boolean;
  user?: { email: string; userId: string };
  token?: string;
  message?: string;
}> => {
  try {
    const response = await api.post(`auth/login`, values);

    if (!response.data.success) {
      toast.error("Login failed:", response.data.message || "Unknown error");
    } else {
      toast.success("Login successful");
      localStorage.setItem("authToken", response.data.token);
      actions.resetForm();
      router.push("/");
    }

    return response.data;
  } catch (error) {
    toast.error("Login error:");
    return { success: false, message: "Login failed" };
  }
};
