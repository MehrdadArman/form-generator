import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import FormCard from "@/pages/Homepage/components/FormCard";
import { type Form } from "@/types";

type FormListProps = {
  forms: Form[];
  onEdit: (form: Form) => void;
  onDelete: (formId: string) => void;
  onView: (form: Form) => void;
};

const FormList: React.FC<FormListProps> = ({
  forms,
  onEdit,
  onDelete,
  onView,
}) => {
  if (forms.length === 0) {
    return (
      <Box textAlign="center" py={4}>
        <Typography variant="h6" color="text.secondary">
          No forms created yet
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Create your first form to get started
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Your Forms ({forms.length})
      </Typography>

      <Grid container spacing={3}>
        {forms.map((form) => (
          <Grid size={{ xs: 12, md: 6, lg: 4 }} key={form.id}>
            <FormCard
              form={form}
              onEdit={() => onEdit(form)}
              onDelete={() => onDelete(form.id)}
              onView={() => onView(form)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FormList;
