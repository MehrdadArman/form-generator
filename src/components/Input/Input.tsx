import React from "react";
import { TextField, type TextFieldProps } from "@mui/material";

interface InputProps extends Omit<TextFieldProps, "variant"> {
  variant?: "outlined" | "filled" | "standard";
}

const Input: React.FC<InputProps> = ({
  variant = "outlined",
  sx,
  ...props
}) => {
  return (
    <TextField
      variant={variant}
      {...props}
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: 2,
        },
        ...sx,
      }}
    />
  );
};

export default Input;
