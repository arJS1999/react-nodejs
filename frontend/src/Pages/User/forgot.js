import { FormControl } from "@mui/material";
import FormLayout from "Components/Form/Layout/FormLayout";
import { TextInputField, SubmitButton } from "Components/Form";
import { FORGOT_PASSWORD } from "../CONSTANTS";
import { OTP } from "../CONSTANTS";
import { FORGOT_INITIAL_FORM_STATE } from "utils/initialFormState/auth";
import { sendOtp } from "Reducer/statevalue";

const INITITAL_FORM_STATE = FORGOT_INITIAL_FORM_STATE;

const AddCategory = () => {
  return (
    <div className=" container w-50">
      <FormLayout
        INITITAL_FORM_STATE={INITITAL_FORM_STATE}
        apicall={sendOtp}
        action={FORGOT_PASSWORD}
      >
        <FormControl margin="normal">
          <div className="h2">{FORGOT_PASSWORD}</div>
        </FormControl>
        <FormControl fullWidth={true} margin="normal">
          <TextInputField name="email" label="Email" margin="normal" />
        </FormControl>
        <FormControl fullWidth={true} margin="normal">
          <SubmitButton>{OTP}</SubmitButton>
        </FormControl>
      </FormLayout>
    </div>
  );
};
export default AddCategory;
