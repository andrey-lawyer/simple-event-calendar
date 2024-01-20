"use client";

import { Formik, Field, ErrorMessage, Form } from "formik";
import { PersistFormikValues } from "formik-persist-values";

import { formatNumber } from "@/services/formatNumber";
import { schemaEventForm } from "@/services/validation";
import { initialValues } from "@/data/initialValues";
import { useUpdateEvent } from "@/hooks/useUpdateEvent";
import { formatValuesForSubmission } from "@/services/formatValuesForSubmission"; 4

import { IFormEventProps } from "@/types/typeProps";

export const FormEvent = ({ type = "add", id }: IFormEventProps) => {
  const initialValuesUpdate = useUpdateEvent(type, id);
  return (
    <Formik
      initialValues={type === "add" ? initialValues : initialValuesUpdate}
      enableReinitialize={true}
      onSubmit={(values) => {
        formatValuesForSubmission(type, values, id);
      }}
      validationSchema={schemaEventForm}
    >
      {({ errors, touched, setFieldValue }) => (
        <Form className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md p-8 bg-white shadow-lg rounded-md">
          <h2 className="text-2xl font-bold mb-8 text-center">
            {type === "add" ? "Create New Event" : "Edit Existing Event"}
          </h2>

          <div className="mb-6">
            <label
              htmlFor="start"
              className="block text-sm font-medium text-gray-700"
            >
              Start Time
            </label>
            <div className="flex items-center">
              <Field
                type="number"
                id="hours"
                name="hours"
                className={`mt-1 p-2 w-1/2 border rounded-md ${
                  errors.hours && touched.hours
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                min="8"
                max="16"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFieldValue(
                    "hours",
                    formatNumber(parseInt(e.target.value))
                  );
                }}
              />
              <span className="mx-2 text-center">hour</span>
              <Field
                type="number"
                id="minutes"
                name="minutes"
                className={`mt-1 p-2 w-1/2 border rounded-md ${
                  errors.minutes && touched.minutes
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                min="0"
                max="59"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFieldValue(
                    "minutes",
                    formatNumber(parseInt(e.target.value))
                  );
                }}
              />
              <span className="mx-2 text-center">min</span>
            </div>
            <ErrorMessage
              name="start"
              component="div"
              className="text-red-500 text-xs mt-1"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="duration"
              className="block text-sm font-medium text-gray-700"
            >
              Duration
            </label>
            <div className="flex items-center">
              <Field
                type="number"
                id="durationHours"
                name="durationHours"
                className={`mt-1 p-2 w-1/2 border rounded-md ${
                  errors.durationHours && touched.durationHours
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                min="0"
                max="9"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFieldValue(
                    "durationHours",
                    formatNumber(parseInt(e.target.value))
                  );
                }}
              />
              <span className="mx-2 text-center">hour</span>
              <Field
                type="number"
                id="durationMinutes"
                name="durationMinutes"
                className={`mt-1 p-2 w-1/2 border rounded-md ${
                  errors.durationMinutes && touched.durationMinutes
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                min="0"
                max="59"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFieldValue(
                    "durationMinutes",
                    formatNumber(parseInt(e.target.value))
                  );
                }}
              />
              <span className="mx-2 text-center">min</span>
            </div>
            <ErrorMessage
              name="duration"
              component="div"
              className="text-red-500 text-xs mt-1"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <Field
              type="text"
              id="title"
              name="title"
              className={`mt-1 p-2 w-full border rounded-md ${
                errors.title && touched.title
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            <ErrorMessage
              name="title"
              component="div"
              className="text-red-500 text-xs mt-1"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 w-full rounded-md hover:bg-blue-600"
          >
            {type === "add" ? "Create Event" : "Update event"}
          </button>

          {type === "add" && (
            <PersistFormikValues persistInvalid={true} name="add_key" />
          )}
        </Form>
      )}
    </Formik>
  );
};
