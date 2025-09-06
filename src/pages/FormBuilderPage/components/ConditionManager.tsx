import React from "react";
import {
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
} from "@mui/material";
import { ExpandMore, AddCircle } from "@mui/icons-material";
import Button from "@/components/Button/Button";
import useConditions from "../hooks/useConditions";
import type { Condition, Element } from "@/types";

interface ConditionManagerProps {
  newElement: Partial<Element>;
  handleEditElement: (element: Element) => void;
  elements: Element[];
}

const ConditionManager: React.FC<ConditionManagerProps> = ({
  newElement,
  handleEditElement,
  elements,
}) => {
  const conditions = useConditions(elements);

  const handleAddCondition = () => {
    const updatedConditions = conditions.handleAddCondition(
      newElement.conditions || []
    );

    handleEditElement({
      ...(newElement as Element),
      conditions: updatedConditions,
    });
    conditions.setIsConditionDialogOpen(false);
  };

  const handleUpdateCondition = () => {
    const updatedConditions: Condition[] = conditions.handleUpdateCondition(
      newElement.conditions || []
    );
    handleEditElement({
      ...(newElement as Element),
      conditions: updatedConditions,
    });
    conditions.setIsConditionDialogOpen(false);
  };

  const handleEditCondition = (condition: any) => {
    conditions.handleUpdateCondition(condition);
  };

  const handleDeleteCondition = (conditionId: string) => {
    const updatedConditions = conditions.handleDeleteCondition(
      conditionId,
      newElement.conditions || []
    );
    handleEditElement({
      ...(newElement as Element),
      conditions: updatedConditions,
    });
  };

  if (!newElement) {
    return null;
  }

  return (
    <>
      {/* Conditions Section */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="h6">
            Conditions ({newElement.conditions?.length || 0})
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box>
            {newElement.conditions?.map((condition: Condition) => (
              <Chip
                key={condition.id}
                label={`${condition.targetElementId} ${condition.operator} ${condition.value}`}
                onDelete={() => handleDeleteCondition(condition.id)}
                onClick={() => handleEditCondition(condition)}
                sx={{ mr: 1, mb: 1 }}
              />
            ))}

            <Button
              variant="primary"
              startIcon={<AddCircle />}
              onClick={() => conditions.setIsConditionDialogOpen(true)}
              size="small"
            >
              Add Condition
            </Button>
          </Box>
        </AccordionDetails>
      </Accordion>

      {/* Condition Dialog */}
      <Dialog
        open={conditions.isConditionDialogOpen}
        onClose={() => conditions.setIsConditionDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {conditions.editingCondition ? "Edit Condition" : "Add New Condition"}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Target Element</InputLabel>
              <Select
                value={conditions.newCondition.targetElementId}
                onChange={(e) =>
                  conditions.setNewCondition({
                    ...conditions.newCondition,
                    targetElementId: e.target.value,
                  })
                }
                label="Target Element"
              >
                {elements.map((element) => (
                  <MenuItem key={element.id} value={element.id}>
                    {element.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Operator</InputLabel>
              <Select
                value={conditions.newCondition.operator}
                onChange={(e) =>
                  conditions.setNewCondition({
                    ...conditions.newCondition,
                    operator: e.target.value,
                  })
                }
                label="Operator"
              >
                <MenuItem value="equals">Equals</MenuItem>
                <MenuItem value="not_equals">Not Equals</MenuItem>
                <MenuItem value="contains">Contains</MenuItem>
                <MenuItem value="greater_than">Greater Than</MenuItem>
                <MenuItem value="less_than">Less Than</MenuItem>
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="Value to Match"
              value={conditions.newCondition.value}
              onChange={(e) =>
                conditions.setNewCondition({
                  ...conditions.newCondition,
                  value: e.target.value,
                })
              }
              sx={{ mb: 2 }}
            />

            <FormControl fullWidth>
              <InputLabel>Logic Operator</InputLabel>
              <Select
                value={conditions.newCondition.logic}
                onChange={(e) =>
                  conditions.setNewCondition({
                    ...conditions.newCondition,
                    logic: e.target.value,
                  })
                }
                label="Logic Operator"
              >
                <MenuItem value="AND">AND</MenuItem>
                <MenuItem value="OR">OR</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => conditions.setIsConditionDialogOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={
              conditions.editingCondition
                ? handleUpdateCondition
                : handleAddCondition
            }
          >
            {conditions.editingCondition ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ConditionManager;
