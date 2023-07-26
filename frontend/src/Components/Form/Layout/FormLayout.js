import { Grid } from "@mui/material";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { logintoken } from "Reducer/statevalue";
import { useSelector } from "react-redux";
const FormLayout = ({
  INITITAL_FORM_STATE,
  FORM_VALIDATION,
  apicall,
  children,
  action,
  end,
}) => {
  console.log(INITITAL_FORM_STATE);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const role = useSelector((state) => state.tokenvalue.value.role);
  console.log(role);
  return (
    <Grid container>
      <Formik
        enableReinitialize
        initialValues={{
          ...INITITAL_FORM_STATE,
        }}
        validationSchema={FORM_VALIDATION}
        onSubmit={async (values, { resetForm }) => {
          console.log(" data ", values);
          const errHandler = (res) => {
            console.log("err", res);
            switch (res.status) {
              case 400:
                return "Bad Request";

              case 404:
                return "Not Found";

              case null:
                return "Unknown Error";

              default:
                return "No Server Response";
            }
          };
          function success(res) {
            Promise.resolve(res).then(function (value) {
              if (end == "LOGIN") {
                console.log(value, "response");
                localStorage.setItem(
                  "token",
                  JSON.stringify(value.data.usertoken)
                );
                localStorage.setItem("Admin", value.data.role);
                dispatch(
                  logintoken({
                    token: JSON.stringify(value.data.usertoken),
                    role: value.data.role,
                  })
                );
                // eslint-disable-next-line no-lone-blocks
                // {

                console.log(value.data.role);
                if (value.data.role == true) {
                  console.log("in");
                  return navigate("/producttable");
                }
                return navigate("/");
                // }
                // navigate("/");
              } else {
                return navigate("/login");
              }
            });
          }
          const DataObj = {
            data: values,
          };
          try {
            switch (action) {
              case "Add Product":
                console.log("add product");
                dispatch(apicall({ DataObj }));
                resetForm();
                break;
              case "Add Category":
                console.log("add category");
                dispatch(apicall({ DataObj }));
                resetForm();
                break;
              case "Update Category":
                console.log("update category");
                dispatch(apicall({ DataObj }));
                return navigate("/");
              case "Update Product":
                console.log("update product");
                dispatch(apicall({ DataObj }));
                return navigate("/");
              case "Set Sequence":
                dispatch(apicall({ DataObj }));
                return;
              case "Query":
                dispatch(apicall({ DataObj }));
                resetForm();
                return navigate("/");
              case "Update Coupon":
                dispatch(apicall({ DataObj }));
                resetForm();
                return navigate("/");
              case "Reset Password":
                dispatch(apicall({ DataObj }));
                return navigate("/otpcheck");
              case "Change Password":
                console.log(DataObj);
                let psw1 = DataObj.data.change;
                let psw2 = DataObj.data.password;
                let result = psw1.localeCompare(psw2);
                console.log(result);
                if (result != 0) {
                  console.log("not match");
                  toast.warn("Password not Match");
                  return;
                }
                console.log("match");
                dispatch(apicall({ DataObj }));
                resetForm();
                return navigate("/login");
              default:
                console.log("api", end);
                const response= apicall(DataObj);
                toast.promise(response, {
                  pending: "saving",
                  error: errHandler(response),
                  success: success(response),
                });
                console.log(response);
            }
          } catch (err) {
            console.log(err);
          }
        }}
      >
        <Form>
          <Grid container>{children}</Grid>
        </Form>
      </Formik>
      <ToastContainer />
    </Grid>
  );
};
export default FormLayout;
