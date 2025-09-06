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
  Switch,
  FormControlLabel,
  Divider,
} from "@mui/material";
import { Add, Save } from "@mui/icons-material";
import Card from "@/components/Card/Card";
import Button from "@/components/Button/Button";
import ElementCard from "@/pages/Homepage/components/ElementCard";
import useFormBuilder from "../hooks/useFormBuilder";
import ConditionManager from "./ConditionManager";

const FormBuilder: React.FC = () => {
  const {
    formName,
    setFormName,
    isElementDialogOpen,
    setIsElementDialogOpen,
    elements,
    editingElement,
    newElement,
    setNewElement,
    handleAddElement,
    handleUpdateElement,
    handleDeleteElement,
    handleSaveForm,
    handleEditElement,
  } = useFormBuilder();

  return (
    <Box>
      <Card sx={{ p: 3, mb: 3 }}>
        <TextField
          fullWidth
          label="Form Name"
          value={formName}
          onChange={(e) => setFormName(e.target.value)}
          sx={{ mb: 2 }}
        />

        <Button
          variant="primary"
          startIcon={<Add />}
          onClick={() => setIsElementDialogOpen(true)}
          sx={{ mb: 3 }}
        >
          Add Element
        </Button>

        <Typography variant="h6" gutterBottom>
          Form Elements ({elements.length})
        </Typography>

        {elements.map((element) => (
          <ElementCard
            key={element.id}
            element={element}
            onEdit={() => handleEditElement(element)}
            onDelete={() => handleDeleteElement(element.id)}
          />
        ))}
        {/* Condition Manager Component */}
        <ConditionManager
          newElement={newElement}
          handleEditElement={handleEditElement}
          elements={elements}
        />

        <Divider sx={{ my: 3 }} />

        <Button
          variant="primary"
          startIcon={<Save />}
          onClick={handleSaveForm}
          fullWidth
        >
          Save Form
        </Button>
      </Card>

      {/* Element Dialog */}
      <Dialog
        open={isElementDialogOpen}
        onClose={() => setIsElementDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {editingElement ? "Edit Element" : "Add New Element"}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Element Label"
              value={newElement.label}
              onChange={(e) =>
                setNewElement({ ...newElement, label: e.target.value })
              }
              sx={{ mb: 2 }}
            />

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Element Type</InputLabel>
              <Select
                value={newElement.type}
                onChange={(e) =>
                  setNewElement({ ...newElement, type: e.target.value as any })
                }
                label="Element Type"
              >
                <MenuItem value="text">Text Input</MenuItem>
                <MenuItem value="checkbox">Checkbox</MenuItem>
              </Select>
            </FormControl>

            <FormControlLabel
              control={
                <Switch
                  checked={newElement.isRequired || false}
                  onChange={(e) =>
                    setNewElement({
                      ...newElement,
                      isRequired: e.target.checked,
                    })
                  }
                />
              }
              label="Required Field"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsElementDialogOpen(false)}>Cancel</Button>
          <Button
            variant="primary"
            onClick={editingElement ? handleUpdateElement : handleAddElement}
          >
            {editingElement ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FormBuilder;
