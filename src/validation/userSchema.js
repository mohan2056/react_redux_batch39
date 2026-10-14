import * as Yup from "yup";

export const userSchema = Yup.object({
  name: Yup.string()
    .trim()
    .min(2, "Name must contain at least 2 characters")
    .max(100, "Maximum 100 characters")
    .required("Name is required"),
  email: Yup.string()
    .trim()
    .email("Enter a valid email address")
    .max(150, "Maximum 150 characters")
    .required("Email is required"),
});
