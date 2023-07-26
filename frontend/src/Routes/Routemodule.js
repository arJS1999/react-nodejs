import React from "react";

// production
import Login from "Pages/User/login";
import Forgot from "Pages/User/forgot";
import AddProduct from "Pages/Admin/addproduct";
import AddCategory from "Pages/Admin/addcategory";
import Signup from "Pages/User/signup";
import Category from "Pages/Admin/category";
import Coupon from "Pages/Admin/coupon";
import Producttable from "Pages/Admin/product";
import Categorycard from "Pages/Category/category";
import EditCategory from "Pages/Admin/editcategory";
import EditProduct from "Pages/Admin/editproduct";
import Adminlayout from "Components/Form/Layout/AdminLayout";
import Sequencetable from "Pages/Admin/sequence";
import Footer from "Footer/footer";
import OtpVerify from "Pages/User/otp";

// import Login from 'User/login'
import Admin from "OLD/Admin/addproduct1";
// import Signup from 'User/signup'
import App from "OLD/Category/app";
import Protected from "Navbar/protected";
import Phonenum from "OLD/excer/phone";
import Home from "OLD/Home/home";
import Product from "OLD/Allproduct/products";
import SingleProduct from "OLD/Allproduct/singleproduct";
import Cancel from "OLD/Cart/cancel";
import Order from "OLD/Order/order";
import Cart from "OLD/Cart/cart";
import { gettoken } from "OLD/tokenauth/auth";
import Logout from "OLD/User/logout";
import { Routes, Route } from "react-router-dom";
import Editcategory from "OLD/Admin/editcategory";
import Addcategory from "OLD/Admin/addcategory";
import { useState } from "react";
import Success from "OLD/Order/success";
import { legacy_createStore as createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducer from "Reducer/productreducer";
import Role from "OLD/tokenauth/role";
import {
  Login_Page,
  Signup_Page,
  Root,
  Logouturl,
  Cart_Page,
  Admin_coupon,
  OTP_CHECK,
  Category_Page,
  Product_Page,
  Single_Product,
  Admin_Page,
  Edit_Category,
  Order_Page,
  Sequence_Page,
  Admin_layout,
  Add_Category,
  Payment_Cancel,
  Forgot_Page,
  Payment_Success,
  Phone,
  Product_table,
  Category_table,
  Category_card,
  Edit_category,
  Edit_product,
  Admin_Page2,
} from "./CONSTANTS";

const store = createStore(reducer, applyMiddleware(thunk));

const Routemodule = () => {
  return (
    <>
      <Routes>
        {/* <Route path={Root} element={<Navbar/>}> */}
        <Route element={<Footer />}>
          <Route path={Login_Page} element={<Login />} />
          <Route path={Forgot_Page} element={<Forgot />} />
          <Route path={Signup_Page} element={<Signup />} />
          <Route path={OTP_CHECK} element={<OtpVerify />} />

          <Route element={<Protected token={gettoken} />}>
            <Route path={Logouturl} element={<Logout />} />
            <Route path={Cart_Page} element={<Cart />} />
            <Route path={Category_Page} element={<App store={store} />} />
            <Route path={Product_Page} element={<Product />} />
            <Route path={Root} element={<Home />} />
            <Route path={Order_Page} element={<Order />} />
            {/* production */}
            {/* <Route path={Admin_Page} element={<AddProduct />} />
          <Route path={Admin_Page2} element={<AddCategory />} /> */}
            {/* <Route path="/admin" element={<Admin />} /> */}
            {/* production */}
          </Route>
          <Route path={Single_Product} element={<SingleProduct />} />
          <Route path={Edit_Category} element={<Editcategory />} />
          <Route path={Add_Category} element={<Addcategory />} />
          <Route path={Payment_Cancel} element={<Cancel />} />
          <Route path={Payment_Success} element={<Success />} />
          <Route path={Phone} element={<Phonenum />} />
        </Route>
        {/* production */}
        <Route element={<Protected token={gettoken} />}>
          <Route element={<Adminlayout />}>
            <Route path={Category_table} element={<Category />} />
            <Route path={Product_table} element={<Producttable />} />
            <Route path={Category_card} element={<Categorycard />} />
            <Route path={Edit_category} element={<EditCategory />} />
            <Route path={Edit_product} element={<EditProduct />} />
            <Route path={Admin_Page} element={<AddProduct />} />
            <Route path={Admin_Page2} element={<AddCategory />} />
            <Route path={Admin_coupon} element={<Coupon />} />
            <Route path={Sequence_Page} element={<Sequencetable />} />
          </Route>
        </Route>
        {/* production */}

        {/* </Route> */}
      </Routes>
    </>
  );
};

export default Routemodule;
