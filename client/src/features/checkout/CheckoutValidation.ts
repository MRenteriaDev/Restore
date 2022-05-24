import * as yup from "yup";

export const validationSchema = [
  yup.object({
    fullName: yup.string().required("Full Name uis required"),
    address1: yup.string().required("Address 1  is required"),
    address2: yup.string().required("Address 2 is required"),
    city: yup.string().required(),
    state: yup.string().required(),
    zip: yup.string().required(),
    country: yup.string().required(),
  }),
  yup.object(),
  yup.object({
    nameOnCard: yup.string().required(),
  }),
];