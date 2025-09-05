import React from "react";
import { Box, Typography, IconButton, Chip } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import Card from "@/components/Card/Card";
import { type Element } from "@/types";

interface ElementCardProps {
  element: Element;
  onEdit: () => void;
  onDelete: () => void;
}

const ElementCard: React.FC<ElementCardProps> = ({
  element,
  onEdit,
  onDelete,
}) => {
  return (
    <Card sx={{ p: 2, mb: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box flex={1}>
          <Typography variant="h6" gutterBottom>
            {element.label}
          </Typography>
          <Box display="flex" gap={1} mb={1}>
            <Chip
              label={element.type}
              size="small"
              color="primary"
              variant="outlined"
            />
            {element.isRequired && (
              <Chip
                label="Required"
                size="small"
                color="error"
                variant="outlined"
              />
            )}
          </Box>
          {element.conditions && element.conditions.length > 0 && (
            <Typography variant="caption" color="text.secondary">
              Has {element.conditions.length} condition(s)
            </Typography>
          )}
        </Box>
        <Box>
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

export default ElementCard;
