import React from "react";
import {
  FormControlLabel,
  Checkbox as MuiCheckbox,
  type CheckboxProps,
} from "@mui/material";

interface CustomCheckboxProps extends Omit<CheckboxProps, "onChange"> {
  label: string;
  onChange: (checked: boolean) => void;
}

const Checkbox: React.FC<CustomCheckboxProps> = ({
  label,
  onChange,
  ...props
}) => {
  return (
    <FormControlLabel
      control={
        <MuiCheckbox {...props} onChange={(e) => onChange(e.target.checked)} />
      }
      label={label}
    />
  );
};

export default Checkbox;
