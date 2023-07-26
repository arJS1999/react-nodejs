import { FormControl } from "@mui/material";
import FormLayout from "Components/Form/Layout/FormLayout";
import { TextInputField, SubmitButton } from "Components/Form";
import { CHANGE_PASSWORD } from "../CONSTANTS";
import { OTP } from "../CONSTANTS";
import { CHANGE_PASSWORD_FORM_STATE } from "utils/initialFormState/auth";
import { checkOtp } from "Reducer/statevalue";

const INITITAL_FORM_STATE = CHANGE_PASSWORD_FORM_STATE;

const AddCategory = () => {
  return (
    <div className=" container w-50">
      <FormLayout
        INITITAL_FORM_STATE={INITITAL_FORM_STATE}
        apicall={checkOtp}
        action={CHANGE_PASSWORD}
      >
        <FormControl margin="normal">
          <div className="h2">{CHANGE_PASSWORD}</div>
        </FormControl>
        <FormControl fullWidth={true} margin="normal">
          <TextInputField name="code" label="OTP Code" margin="normal" />
        </FormControl>
        <FormControl fullWidth={true} margin="normal">
          <TextInputField name="change" label="New Password" margin="normal" />
        </FormControl>
        <FormControl fullWidth={true} margin="normal">
          <TextInputField
            name="password"
            label="Confirm Password"
            margin="normal"
          />
        </FormControl>
        <FormControl fullWidth={true} margin="normal">
          <SubmitButton>{OTP}</SubmitButton>
        </FormControl>
      </FormLayout>
    </div>
  );
};
export default AddCategory;
