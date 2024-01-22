import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

import { submitEvent, updateEvent } from "./apiSubmitEvent";
import { calculateMinutes } from "./calculateMinutes";

import { IFormikValue } from "@/types/extendTypeFormik";

export const formatValuesForSubmission = async (
  type: string,
  values: any,
  actions: IFormikValue,
  router: AppRouterInstance,
  token: string | null,
  dispatch: Dispatch<UnknownAction>,
  id?: string | string[]
) => {
  const startTimeInMinutes = calculateMinutes(values.hours, values.minutes);
  const durationInMinutes = calculateMinutes(
    values.durationHours,
    values.durationMinutes
  );

  const maxEndTimeInMinutes = calculateMinutes("17", "0");

  if (
    startTimeInMinutes < 0 ||
    startTimeInMinutes + durationInMinutes > maxEndTimeInMinutes
  ) {
    console.error("Error: Event time exceeds the allowed limits.");
    return null;
  }

  const formattedValues = {
    start: startTimeInMinutes - calculateMinutes("8", "0"),
    duration: durationInMinutes,
    title: values.title,
  };

  if (type === "add") {
    const { success } = await submitEvent(
      formattedValues,
      actions,
      token,
      dispatch
    );
    return success;
  } else if (type === "update" && id) {
    const { success } = await updateEvent(
      id,
      formattedValues,
      actions,
      router,
      token,
      dispatch
    );
    return success;
  }
};
