import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";

export const USER_SIGNUP_FORM_VALIDATION = Yup.object().shape({
  name: Yup.string()
    .min(4, "Please Enter atleast 4 characters")
    .required("Required"),
  email: Yup.string().email("Please Enter a Valid Email").required("Required"),
  password: Yup.string()
    .min(8, "Please Enter atleast 8 characters")
    .required("Required"),
});

export const LOGIN_FORM_VALIDATION = Yup.object().shape({
  email: Yup.string().email("Please Enter a Valid Email").required("Required"),
  password: Yup.string()
    .min(5, "Please Enter atleast 5 characters")
    .required("Required"),
  name: Yup.string().required("Required"),
});

export const EDIT_CATEGORY_FORM_VALIDATION = Yup.object().shape({
  category_name: Yup.string().required("Required"),
});

export const ADD_CATEGORY_FORM_VALIDATION = Yup.object().shape({
  // name: Yup.string().required("Required"),
});

export const SEQUENCE_FORM_VALIDATION = Yup.object().shape({
  product_order: Yup.number().required("Required"),
});

export const EDIT_PRODUCT_FORM_VALIDATION = Yup.object().shape({
  name: Yup.string().required("Required"),
  price: Yup.number().required("Required"),
  image: Yup.mixed().required("Required"),
});

export const MAIL_FORM_VALIDATION = Yup.object().shape({
  address: Yup.string().required("Required"),
  message: Yup.string().required("Required"),
});

export const ADD_PRODUCT_FORM_VALIDATION = Yup.object().shape({
  // name: Yup.string().required("Required"),
  // price: Yup.number().required("Required"),
  // product_id: Yup.number().required("Required"),
  // image: Yup.mixed().required("Required"),
});
