import { axiosapi } from "./api/createAPI";
import {
  POST,
  SIGNUP,
  LOGIN,
  ADD_PRODUCT,
  PATCH,
  ADD_CATEGORY,
  CATEGORY,
  SENDOTP,
  GET,
  SEARCH_PRODUCT_DATA,
  CHECKOTP,
  SEARCH_DATA,
  PRODUCT,
  UPDATE_CATEGORY,
  GET_COUPON,
  UPDATE_COUPON,
  UPDATE_PRODUCT,
  DELETE_CATEGORY,
  DELETE_PRODUCT,
  SEQUENCE,
  UPDATE_PRODUCT_ORDER,
  PAGINATE_CATEGORY,
  PAGINATE_PRODUCT,
  SEND_MAIL,
  SEQUENCE_PAGINATION,
} from "./CONSTANTS";

export const login = (obj) => {
  return axiosapi({
    method: POST,
    url: LOGIN,
    data: obj.data,
    headers: { "Content-Type": "application/json" },
  });
};

export const signUp = (obj) => {
  return axiosapi({
    method: POST,
    url: SIGNUP,
    data: obj.data,
    headers: { "Content-Type": "application/json" },
  });
};

// export const delproduct = (obj) => {
//     return axiosapi({
//         method : POST,
//         url    : 'product/delproduct/'+obj,
//         headers: { 'Content-Type': 'application/json' }
//     })
// }

export const editproduct = (obj) => {
  console.log(obj);
  return axiosapi({
    method: GET,
    url: "product/editproduct/" + obj,
    headers: { "Content-Type": "application/json" },
  });
};

export const editcategory = (obj) => {
  console.log(obj);
  return axiosapi({
    method: GET,
    url: "category/editcategory1/" + obj,
    headers: { "Content-Type": "application/json" },
  });
};

export const sendOTP = (obj) => {
  console.log(obj.data);
  return axiosapi({
    method: POST,
    url: SENDOTP,
    data: obj.data,
    headers: { "Content-Type": "application/json" },
  });
};

export const checkdata = (obj) => {
  console.log(obj.data);
  return axiosapi({
    method: POST,
    url: CHECKOTP,
    data: obj.data,
    headers: { "Content-Type": "application/json" },
  });
};

export const getcoupon = () => {
  return axiosapi({
    method: GET,
    url: GET_COUPON,
    headers: { "Content-Type": "application/json" },
  });
};

export const updatecoupon = (obj) => {
  console.log(obj.data);
  return axiosapi({
    method: PATCH,
    url: UPDATE_COUPON,
    data: obj.data,
    headers: { "Content-Type": "application/json" },
  });
};

export const updatecategory = (obj) => {
  console.log(obj.data);
  return axiosapi({
    method: POST,
    url: UPDATE_CATEGORY,
    data: obj.data,
    headers: { "Content-Type": "application/json" },
  });
};

export const updateproduct = (obj) => {
  console.log(obj.data);
  const data = obj.data;
  const formdata = new FormData();
  formdata.append("name", data.name);
  formdata.append("price", data.price);
  formdata.append("id", data.id);
  formdata.append("image", data.image);
  return axiosapi({
    method: POST,
    url: UPDATE_PRODUCT,
    data: formdata,
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const addproduct = (obj) => {
  const data = obj.data;
  console.log(obj);
  const formdata = new FormData();
  formdata.append("name", data.name);
  formdata.append("price", data.price);
  formdata.append("product_id", data.product_id);
  formdata.append("image", data.image);
  console.log(
    "formdata",
    data.name,
    data.image,
    data.product_id,
    data.price,
    formdata
  );
  return axiosapi({
    method: POST,
    url: ADD_PRODUCT,
    data: formdata,
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const addcategory = (obj) => {
  const data = obj.data;
  console.log("data", data);
  return axiosapi({
    method: POST,
    url: ADD_CATEGORY,
    data: data,
    headers: { "Content-Type": "application/json" },
  });
};

export const sendmail = (obj) => {
  // const data = obj.data;
  console.log("data", obj.data);
  return axiosapi({
    method: POST,
    url: SEND_MAIL,
    data: obj.data,
    headers: { "Content-Type": "application/json" },
  });
};

export const searchdata = (obj) => {
  console.log("data", obj);
  return axiosapi({
    method: GET,
    url: SEARCH_DATA + "/" + obj,
    headers: { "Content-Type": "application/json" },
  });
};

export const searchProduct = (obj) => {
  console.log("data", obj);
  return axiosapi({
    method: GET,
    url: SEARCH_PRODUCT_DATA + "/" + obj,
    headers: { "Content-Type": "application/json" },
  });
};

export const category = () => {
  return axiosapi({
    method: GET,
    url: CATEGORY,
    headers: { "Content-Type": "application/json" },
  });
};

export const product = () => {
  return axiosapi({
    method: GET,
    url: PRODUCT,
    headers: { "Content-Type": "application/json" },
  });
};

export const deletecategory = (obj) => {
  console.log(obj);
  return axiosapi({
    method: POST,
    url: DELETE_CATEGORY + "/" + obj.data,
    headers: { "Content-Type": "application/json" },
  });
};

export const deleteproduct = (obj) => {
  console.log(obj);
  return axiosapi({
    method: POST,
    url: DELETE_PRODUCT + "/" + obj.data,
    headers: { "Content-Type": "application/json" },
  });
};

export const paginateproduct = (obj) => {
  const limit = obj.paginate.limit;
  const page = obj.paginate.page;
  return axiosapi({
    method: GET,
    url: PAGINATE_PRODUCT + "/?page=" + page + "&limit=" + limit,
    headers: { "Content-Type": "application/json" },
  });
};

export const paginatecategory = (obj) => {
  const limit = obj.paginate.limit;
  const page = obj.paginate.page;
  return axiosapi({
    method: GET,
    url: PAGINATE_CATEGORY + "/?page=" + page + "&limit=" + limit,
    headers: { "Content-Type": "application/json" },
  });
};

export const paginatesequence = (obj) => {
  const limit = obj.paginate.limit;
  const page = obj.paginate.page;
  return axiosapi({
    method: GET,
    url: SEQUENCE_PAGINATION + "/?page=" + page + "&limit=" + limit,
    headers: { "Content-Type": "application/json" },
  });
};

export const sequencedata = () => {
  return axiosapi({
    method: GET,
    url: SEQUENCE,
    headers: { "Content-Type": "application/json" },
  });
};

export const sequenceorder = (obj) => {
  const data = obj.data;
  console.log("data", data);
  return axiosapi({
    method: POST,
    url: UPDATE_PRODUCT_ORDER,
    data: data,
    headers: { "Content-Type": "application/json" },
  });
};
