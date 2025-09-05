import React from "react";
import { Box, FormControl } from "@mui/material";
import Input from "@/components/Input/Input";
import Checkbox from "@/components/Checkbox/Checkbox";
import { type Element } from "@/types";
import type { UseFormRegister } from "react-hook-form";

interface FormFieldProps {
  element: Element;
  value: any;
  onChange: (value: any) => void;
  error?: string;
  register: UseFormRegister<any>;
}

const FormField: React.FC<FormFieldProps> = ({
  element,
  value,
  onChange,
  error,
  register,
}) => {
  const renderField = () => {
    const commonProps = {
      fullWidth: true,
      error: !!error,
      helperText: error,
    };

    switch (element.type) {
      case "text":
        return (
          <Input
            {...commonProps}
            label={element.label}
            placeholder={element.placeholder}
            value={value || ""}
            {...register(element.id)}
          />
        );

      case "checkbox":
        return (
          <Checkbox
            label={element.label}
            checked={value || false}
            onChange={(checked) => onChange(checked)}
          />
        );

      default:
        return null;
    }
  };

  return (
    <FormControl fullWidth error={!!error}>
      <Box sx={{ mb: 2 }}>{renderField()}</Box>
    </FormControl>
  );
};

export default FormField;
