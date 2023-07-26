import { FormControl } from "@mui/material";
import FormLayout from "Components/Form/Layout/FormLayout";
import { TextInputField, SubmitButton } from "Components/Form";
import { ADD_CATEGORY } from "../CONSTANTS";
import { CREATE, UPDATE_COUPON } from "../CONSTANTS";
import { addCategory, getCoupon, updateCoupon } from "Reducer/statevalue";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Table, TableLoader } from "Loader/loader";

const UpdateCoupon = () => {
  const dispatch = useDispatch();
  const coupon = useSelector((state) => state.tokenvalue.value.coupondata);
  const loading = useSelector((state) => state.tokenvalue.value.loading);

  useEffect(() => {
    dispatch(getCoupon());
  }, [dispatch]);

  function valid() {
    return {
      id: coupon.id,
      promo_code: coupon.promo_code,
    };
  }

  console.log("coupon");
  return (
    <div className=" container w-50">
      {!loading ? (
        <FormLayout
          INITITAL_FORM_STATE={valid()}
          apicall={updateCoupon}
          action={UPDATE_COUPON}
        >
          <FormControl margin="normal">
            <div className="h2">{UPDATE_COUPON}</div>
          </FormControl>
          <FormControl fullWidth={true} margin="normal">
            <TextInputField
              name="promo_code"
              label="Promotion Code"
              margin="normal"
            />
          </FormControl>
          <FormControl fullWidth={true} margin="normal">
            <SubmitButton>{CREATE}</SubmitButton>
          </FormControl>
        </FormLayout>
      ) : (
        <TableLoader />
      )}
    </div>
  );
};
export default UpdateCoupon;
