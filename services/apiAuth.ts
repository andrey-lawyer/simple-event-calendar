import { FormikHelpers } from "formik";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

import { api } from "./axiosInstance";
import { IValue } from "@/types/valueForm";


export const register = async (
  values: IValue,
  actions: FormikHelpers<IValue>,
  router: AppRouterInstance
): Promise<{ success: boolean; message?: string }> => {
  try {
    const response = await api.post(`auth/register`, values);

    if (!response.data.success) {
      console.error(
        "Registration failed:",
        response.data.message || "Unknown error"
      );
    } else {
      console.log("Registration successful");
      localStorage.setItem("registeredUserEmail", values.email);
      actions.resetForm();
      router.push("/login");
    }

    return response.data;
  } catch (error) {
    console.error("Registration error:", error);
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
      console.error("Login failed:", response.data.message || "Unknown error");
    } else {
      console.log("Login successful");
      localStorage.setItem("authToken", response.data.token);
      actions.resetForm();
      router.push("/");
    }

    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, message: "Login failed" };
  }
};
