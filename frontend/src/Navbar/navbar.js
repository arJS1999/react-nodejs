import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import {getrole} from '../tokenauth/role'
// import {gettoken} from '../tokenauth/role'
import "./navbar.css";

const Navbar = () => {
  const role = useSelector((state) => state.tokenvalue.value.role);
  // const role=use
  const token = useSelector((state) => state.tokenvalue.value.token);

  console.log("rolebased", role);

  console.log("token", token);

  return (
    <>
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-primary">
          {role == true ? (
            <div className="navbar-nav mr-auto">
              <Link to={"/producttable"} className="nav-link">
                Action
              </Link>
            </div>
          ) : (
            <>
              <div className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link to={"/"} className="nav-link">
                    Home
                  </Link>
                </li>
              </div>
              <div className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link to={"/cate"} className="nav-link">
                    Category
                  </Link>
                </li>
              </div>
              <div className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link to={"/product"} className="nav-link">
                    Product
                  </Link>
                </li>
              </div>
              <div className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link to={"/cart"} className="nav-link">
                    <i className="fas fa-shopping-cart"></i>Cart
                  </Link>
                </li>
              </div>
              <div className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link to={"/order"} className="nav-link">
                    Orders
                  </Link>
                </li>
              </div>
            </>
          )}
          {token ? (
            <div className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link
                  to={"/logout"}
                  className="nav-link"
                  onClick={() => window.location.reload()}
                >
                  Logout
                </Link>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/signup"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>
      </div>
    </>
  );
};

export default Navbar;
