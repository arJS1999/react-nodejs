import { useFormikContext } from "formik";
import { Button } from "@mui/material";
import { useEffect } from "react";

const ButtonWrapper = ({ children, ...otherProps }) => {
  const { submitForm } = useFormikContext();

  const handleSubmit = () => {
    submitForm();
  };

  const configButton = {
    variant: "contained",
    color: "primary",
    onClick: handleSubmit,
  };

  return <Button {...configButton}>{children}</Button>;
};
export default ButtonWrapper;
