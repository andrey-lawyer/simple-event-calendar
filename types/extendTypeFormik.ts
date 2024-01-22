import { FormikHelpers } from "formik";
export interface IFormikValue
  extends FormikHelpers<{
    hours: string;
    minutes: string;
    durationHours: string;
    durationMinutes: string;
    title: string;
  }> {}
