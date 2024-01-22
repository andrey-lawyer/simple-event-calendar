import { FormikHelpers } from "formik";
import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

import { api } from "./axiosInstance";
import { userSlice } from "@/lib/redux";

import { IValue } from "@/types/valueForm";

export const register = async (
  values: IValue,
  actions: FormikHelpers<IValue>,
  router: AppRouterInstance,
  dispatch: Dispatch<UnknownAction>
): Promise<{ success: boolean; message?: string }> => {
  try {
    dispatch(userSlice.actions.statusApp(true));
    const response = await api.post(`auth/register`, values);

    if (!response.data.success) {
      toast.error(
        "Registration failed:",
        response.data.message || "Unknown error"
      );
    } else {
      toast.success("Registration successful");
      actions.resetForm();
      router.push("/login");
    }

    return response.data;
  } catch (error) {
    toast.error("Registration failed");
    return { success: false, message: "Registration failed" };
  } finally {
    dispatch(userSlice.actions.statusApp(false));
  }
};

export const login = async (
  values: IValue,
  actions: FormikHelpers<IValue>,
  router: AppRouterInstance,
  dispatch: Dispatch<UnknownAction>
): Promise<{
  success: boolean;
  user?: { email: string; userId: string };
  token?: string;
  message?: string;
}> => {
  try {
    dispatch(userSlice.actions.statusApp(true));
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
  } finally {
    dispatch(userSlice.actions.statusApp(false));
  }
};
