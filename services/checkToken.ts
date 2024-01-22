import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

import { validateToken } from "./apiCheckStorage";
import { userSlice } from "@/lib/redux";

export async function checkToken(
  router: AppRouterInstance,
  dispatch: Dispatch<UnknownAction>
) {
  const userToken = localStorage.getItem("authToken");
  try {
    const tokenValidationResult = await validateToken(userToken, dispatch);

    if (!tokenValidationResult || !tokenValidationResult?.success) {
      router.push("/register");
    } else {
      dispatch(userSlice.actions.tokenUser(userToken));
      dispatch(userSlice.actions.emailUser(tokenValidationResult?.email));
    }
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(userSlice.actions.statusApp(false));
  }
}
