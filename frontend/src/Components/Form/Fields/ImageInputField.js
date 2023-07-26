import { Field, formik } from "formik";
import { TextField } from "@mui/material";
const ImageInputField = ({ name, type }) => {
  return (
    <div className=" mb-2">
      <Field>
        {({ form }) => {
          return (
            <input
              className="form-control"
              id={name}
              type="file"
              name={name}
              onChange={(e) => {
                form.setFieldValue(name, e.target.files[0]);
              }}
            />
          );
        }}
      </Field>
    </div>
  );
};
export default ImageInputField;
