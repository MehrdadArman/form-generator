import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { Edit, Delete, Visibility } from "@mui/icons-material";
import Card from "@/components/Card/Card";
import { type Form } from "@/types";
import DateHelper from "@/utils/dateHelper";

// Single Responsibility: Only handles form card display
interface FormCardProps {
  form: Form;
  onEdit: () => void;
  onDelete: () => void;
  onView: () => void;
}

const FormCard: React.FC<FormCardProps> = ({
  form,
  onEdit,
  onDelete,
  onView,
}) => {
  return (
    <Card sx={{ p: 3 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <Box flex={1}>
          <Typography variant="h5" gutterBottom>
            {form.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {form.elements.length} element(s)
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Created: {DateHelper.formatDate(form.createdAt)}
          </Typography>
        </Box>
        <Box display="flex" gap={1}>
          <IconButton onClick={onView} size="small" color="primary">
            <Visibility />
          </IconButton>
          <IconButton onClick={onEdit} size="small">
            <Edit />
          </IconButton>
          <IconButton onClick={onDelete} size="small" color="error">
            <Delete />
          </IconButton>
        </Box>
      </Box>
    </Card>
  );
};

export default FormCard;
