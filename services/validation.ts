import * as Yup from "yup";

export const schemaAuthForm = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .min(4, "Password must be at least 4 characters")
    .required("Required"),
});

export const schemaEventForm = Yup.object().shape({
  title: Yup.string().required("Title is required"),
});
