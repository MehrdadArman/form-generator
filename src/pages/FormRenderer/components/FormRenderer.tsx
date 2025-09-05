import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Typography } from "@mui/material";
import Card from "@/components/Card/Card";
import Button from "@/components/Button/Button";
import FormField from "./Formfield";
import { type Form, type FormData } from "@/types";
import { ValidationService } from "@/utils/validation";
import { ConditionalLogicService } from "@/utils/conditionalLogic";

// Single Responsibility: Only handles form rendering and submission
interface FormRendererProps {
  form: Form;
  onSubmit: (data: FormData) => void;
}

const FormRenderer: React.FC<FormRendererProps> = ({ form, onSubmit }) => {
  const validationSchema = ValidationService.createSchema(form.elements);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: form.elements.reduce((acc, element) => {
      acc[element.id] = element.type === "checkbox" ? false : "";
      return acc;
    }, {} as FormData),
  });

  const watchedValues = watch();

  const handleFieldChange = (elementId: string, value: any) => {
    setValue(elementId, value);
  };

  const shouldShowElement = (element: any): boolean => {
    return ConditionalLogicService.shouldShowElement(element, watchedValues);
  };

  return (
    <Card sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        {form.name}
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        {form.elements.map((element) => {
          if (!shouldShowElement(element)) {
            return null;
          }

          return (
            <FormField
              key={element.id}
              element={element}
              value={watchedValues[element.id]}
              onChange={(value) => handleFieldChange(element.id, value)}
              error={errors[element.id]?.message as string}
              register={register}
            />
          );
        })}

        <Box sx={{ mt: 3 }}>
          <Button type="submit" variant="primary" fullWidth>
            Submit Form
          </Button>
        </Box>
      </form>
    </Card>
  );
};

export default FormRenderer;
