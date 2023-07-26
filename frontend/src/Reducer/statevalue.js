import { createSlice } from "@reduxjs/toolkit";

const settoken = localStorage.getItem("token");
const setrole = localStorage.getItem("Admin") == "true" ? true : false;
const storeSlice = createSlice({
  name: "token",

  initialState: {
    value: {
      token: settoken ? settoken : "",
      role: setrole ? setrole : false,
      productdata: [],
      categorydata: [],
      editproduct: [],
      editcategory: [],
      loading: true,
      sequencedata: [],
      coupondata: {},
      pagecount: null,
    },
  },
  reducers: {
    logintoken: (state, action) => {
      state.value.token = action.payload.token;
      state.value.role = action.payload.role;
      console.log(state.value.role);
    },
    getProduct() {},
    setProduct: (state, action) => {
      const productdata = action.payload.result;
      console.log(productdata);
      state.value.loading = false;
      state.value.productdata = productdata;
    },

    setcoupon: (state, action) => {
      const coupon = action.payload.result[0];
      console.log("coupon", coupon);
      state.value.loading = false;
      state.value.coupondata = coupon;
    },
    sendOtp() {},
    paginateSequence() {},
    setPaginateSequence: (state, action) => {
      const sequence = action.payload.result[0];
      const pagecount = action.payload.result[1];
      console.log("res", sequence, pagecount);
      state.value.loading = false;
      state.value.productdata = sequence;
      state.value.pagecount = pagecount;
    },
    sendMail() {},
    searchCategory() {},
    searchProduct() {},
    setSearchdata: (state, action) => {
      console.log(action.payload.result);
      const sequence = action.payload.result[0];
      const pagecount = action.payload.result[1];
      console.log("res", sequence, pagecount);
      state.value.loading = false;
      state.value.productdata = sequence;
      state.value.pagecount = pagecount;
    },
    paginateProduct() {},
    setPaginateProduct: (state, action) => {
      const sequence = action.payload.result[0];
      const pagecount = action.payload.result[1];
      console.log("res", sequence, pagecount);
      state.value.loading = false;
      state.value.productdata = sequence;
      state.value.pagecount = pagecount;
    },
    paginateCategory() {},
    setPaginateCategory: (state, action) => {
      const sequence = action.payload.result[0];
      const pagecount = action.payload.result[1];
      console.log("res", sequence, pagecount);
      state.value.loading = false;
      state.value.productdata = sequence;
      state.value.pagecount = pagecount;
    },
    getCategory() {},
    setCategory: (state, action) => {
      const categorydata = action.payload.result;
      console.log(categorydata);
      state.value.loading = false;
      state.value.categorydata = categorydata;
    },

    editproduct() {},
    setEditproduct: (state, action) => {
      const editproduct = action.payload.result;
      console.log(editproduct);
      state.value.loading = false;
      state.value.editproduct = editproduct;
    },

    editcategory() {},
    setEditcategory: (state, action) => {
      const editcategory = action.payload.result;
      console.log(editcategory);
      state.value.loading = false;
      state.value.editcategory = editcategory;
    },

    getSequence() {},
    setSequencedata: (state, action) => {
      const sequencedata = action.payload.result;
      console.log(sequencedata);
      state.value.loading = false;
      state.value.sequencedata = sequencedata;
    },
    checkOtp() {},
    getCoupon() {},
    addProduct() {},
    addCategory() {},
    updateCoupon() {},
    updateProduct() {},
    updateCategory() {},
    deleteCategory() {},
    deleteProduct() {},
    updateSequence() {},
  },
});

export const {
  logintoken,
  editproduct,
  updateSequence,
  getProduct,
  updateCategory,
  addProduct,
  sendMail,
  addCategory,
  getCoupon,
  checkOtp,
  updateProduct,
  updateCoupon,
  paginateProduct,
  editcategory,
  setEditcategory,
  deleteCategory,
  deleteProduct,
  setEditproduct,
  setcoupon,
  setPaginateSequence,
  getCategory,
  setPaginateProduct,
  searchCategory,
  setSearchdata,
  paginateCategory,
  sendOtp,
  setPaginateCategory,
  paginateSequence,
  setCategory,
  searchProduct,
  setSequencedata,
  getSequence,
  setProduct,
} = storeSlice.actions;
export default storeSlice;
