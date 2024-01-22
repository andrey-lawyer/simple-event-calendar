"use client";

import { Formik, Field, Form, ErrorMessage } from "formik";
import { useRouter } from "next/navigation";
import { PersistFormikValues } from "formik-persist-values";
import { useDispatch, useSelector } from "react-redux";

import { initialState } from "@/data/initialState";
import { schemaAuthForm } from "@/services/validation";
import { login, register } from "@/services/apiAuth";
import { selectStatus } from "@/lib/redux";

import { Loader } from "./Loader";

import { IFormAuthProps } from "@/types/typeProps";

export const FormAuth = ({ type }: IFormAuthProps) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const loading = useSelector(selectStatus);

  let title: string, textButton: string, keyPersist: string;
  if (type === "register") {
    title = "Registration form";
    textButton = "Sign up";
    keyPersist = "register_key";
  } else if (type === "login") {
    title = "Login Form";
    textButton = "Log In";
    keyPersist = "login_key";
  }

  return (
    <>
      <Formik
        initialValues={initialState}
        onSubmit={(values, actions) => {
          if (type === "register") {
            register(values, actions, router, dispatch);
          } else if (type === "login") {
            login(values, actions, router, dispatch);
          }
        }}
        validationSchema={schemaAuthForm}
      >
        {({ errors, touched }) => {
          return (
            <Form className="font-inter fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md p-8 bg-white shadow-lg rounded-md">
              <h2 className="text-2xl font-bold mb-8 text-center">{title}</h2>

              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className={`mt-1 p-2 w-full border rounded-md ${
                    errors.email && touched.email
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  className={`mt-1 p-2 w-full border rounded-md ${
                    errors.password && touched.password
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 w-full rounded-md hover:bg-blue-600"
              >
                {textButton}
              </button>

              <PersistFormikValues persistInvalid={true} name={keyPersist} />
            </Form>
          );
        }}
      </Formik>
      {loading && <Loader />}
    </>
  );
};
