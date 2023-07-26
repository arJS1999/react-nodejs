import React from "react";
import { Outlet } from "react-router";
import { Link } from "react-router-dom";
import { FormControl } from "@mui/material";
import FormLayout from "Components/Form/Layout/FormLayout";
import {
  TextInputField,
  SubmitButton,
  // TextareaInputField,
} from "Components/Form";

import { MAIL_SEND } from "Pages/CONSTANTS";
import { CREATE } from "Pages/CONSTANTS";
import { MAIL_INITIAL_FORM_STATE } from "utils/initialFormState/auth";
import { sendMail } from "Reducer/statevalue";
import { MAIL_FORM_VALIDATION } from "utils/validation/formValidation";

const INITITAL_FORM_STATE = MAIL_INITIAL_FORM_STATE;

export default function Footer() {
  return (
    <div>
      <div>
        <Outlet />
      </div>
      <footer className="text-center text-lg-start bg-dark  text-muted">
        <section className="">
          <div className="container text-center text-md-start mt-5">
            <div className="row mt-3">
              <div className="col-md-2 col-lg-2 col-xl-2 text-white mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Pages</h6>
                <p>
                  <Link style={{ color: "white" }} to={"/"}>
                    Home
                  </Link>
                </p>
                <p>
                  <Link style={{ color: "white" }} to={"/cate"}>
                    Category
                  </Link>
                </p>
                <p>
                  <Link style={{ color: "white" }} to={"/product"}>
                    Product
                  </Link>
                </p>
              </div>

              <div className="col-md-3 col-lg-2 col-xl-2 text-white mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Progress</h6>
                <p>
                  <Link style={{ color: "white" }} to={"/cart"}>
                    Cart
                  </Link>
                </p>
                <p>
                  <Link style={{ color: "white" }} to={"/order"}>
                    Orders
                  </Link>
                </p>
              </div>

              <div className=" container w-50">
                <FormLayout
                  INITITAL_FORM_STATE={INITITAL_FORM_STATE}
                  FORM_VALIDATION={MAIL_FORM_VALIDATION}
                  data={INITITAL_FORM_STATE}
                  apicall={sendMail}
                  action={MAIL_SEND}
                >
                  <FormControl margin="normal">
                    <h6 className="text-uppercase text-white fw-bold mb-4">
                      Send Queries
                    </h6>
                  </FormControl>
                  <FormControl fullWidth={true} margin="normal">
                    <TextInputField
                      name="address"
                      label="Email"
                      margin="normal"
                      // sx={{ input: { color: "white" } }}
                      rows={2}
                      multiline
                      inputProps={{ style: { backgroundColor: "#fff" } }}
                    />
                  </FormControl>
                  <FormControl fullWidth={true} margin="normal">
                    <TextInputField
                      name="message"
                      label="Query"
                      margin="normal"
                      inputProps={{ style: { backgroundColor: "#fff" } }}
                      multiline
                      rows={3}
                      rowsMax={10}
                    />
                  </FormControl>

                  <FormControl fullWidth={true} margin="normal">
                    <SubmitButton>{CREATE}</SubmitButton>
                  </FormControl>
                </FormLayout>
              </div>
            </div>
          </div>
        </section>
      </footer>
    </div>
  );
}
