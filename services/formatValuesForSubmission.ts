import { submitEvent, updateEvent } from "./apiSubmitEvent";
import { calculateMinutes } from "./calculateMinutes";

export const formatValuesForSubmission = (
  type: string,
  values: any,
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
    submitEvent(formattedValues);
  } else if (type === "update" && id) {
    updateEvent(id, formattedValues);
  }
};
