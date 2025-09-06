import { useState, useCallback } from "react";
import { enqueueSnackbar } from "notistack";
import type { Condition, Element } from "@/types";
import { FormHelperService } from "@/utils/formHelpers";

interface UseConditionsReturn {
  // State
  isConditionDialogOpen: boolean;
  editingCondition: Condition | null;
  newCondition: Partial<Condition>;

  // Actions
  handleAddCondition: (currentConditions: Condition[]) => Condition[];
  handleUpdateCondition: (currentConditions: Condition[]) => Condition[];
  handleDeleteCondition: (
    conditionId: string,
    currentConditions: Condition[]
  ) => Condition[];
  resetConditionForm: () => void;

  // Setters
  setIsConditionDialogOpen: (open: boolean) => void;
  setEditingCondition: (condition: Condition | null) => void;
  setNewCondition: (condition: Partial<Condition>) => void;
}

const useConditions = (elements: Element[]): UseConditionsReturn => {
  const [isConditionDialogOpen, setIsConditionDialogOpen] = useState(false);
  const [editingCondition, setEditingCondition] = useState<Condition | null>(
    null
  );
  const [newCondition, setNewCondition] = useState<Partial<Condition>>({
    targetElementId: "",
    operator: "equals",
    value: "",
    logic: "AND",
  });

  const handleAddCondition = useCallback(
    (currentConditions: Condition[]): Condition[] => {
      if (!newCondition.targetElementId || !newCondition.value) {
        enqueueSnackbar("Please fill all condition fields", {
          variant: "error",
        });
        return currentConditions;
      }

      const targetElement = elements.find(
        (e) => e.id === newCondition.targetElementId
      );

      if (!targetElement) {
        enqueueSnackbar("Target element not found", {
          variant: "error",
        });
        return currentConditions;
      }

      const condition: Condition = {
        id: FormHelperService.generateId(),
        targetElementId: newCondition.targetElementId,
        operator: newCondition.operator || "equals",
        value: newCondition.value,
        logic: newCondition.logic || "AND",
      };

      resetConditionForm();
      setIsConditionDialogOpen(false);

      return [...currentConditions, condition];
    },
    [newCondition, elements]
  );

  const handleUpdateCondition = useCallback(
    (currentConditions: Condition[]): Condition[] => {
      if (!editingCondition) return currentConditions;

      const updatedCondition: Condition = {
        ...editingCondition,
        ...newCondition,
      };

      // Find the element that contains this condition and update it
      const elementWithCondition = elements.find((element) =>
        element.conditions?.some((c) => c.id === editingCondition.id)
      );

      if (!elementWithCondition) {
        enqueueSnackbar("Element with condition not found", {
          variant: "error",
        });
        return currentConditions;
      }

      setEditingCondition(null);
      resetConditionForm();
      setIsConditionDialogOpen(false);

      return currentConditions.map((c) =>
        c.id === editingCondition.id ? updatedCondition : c
      );
    },
    [editingCondition, newCondition, elements]
  );

  const handleDeleteCondition = useCallback(
    (conditionId: string, currentConditions: Condition[]): Condition[] => {
      // Find the element that contains this condition
      const elementWithCondition = elements.find((element) =>
        element.conditions?.some((c) => c.id === conditionId)
      );

      if (!elementWithCondition) {
        enqueueSnackbar("Element with condition not found", {
          variant: "error",
        });
        return currentConditions;
      }

      const updatedConditions = currentConditions.filter(
        (c) => c.id !== conditionId
      );

      return updatedConditions;
    },
    [elements]
  );

  const resetConditionForm = useCallback(() => {
    setNewCondition({
      targetElementId: "",
      operator: "equals",
      value: "",
      logic: "AND",
    });
    setEditingCondition(null);
  }, []);

  return {
    // State
    isConditionDialogOpen,
    editingCondition,
    newCondition,

    // Actions
    handleAddCondition,
    handleUpdateCondition,
    handleDeleteCondition,
    resetConditionForm,

    // Setters
    setIsConditionDialogOpen,
    setEditingCondition,
    setNewCondition,
  };
};

export default useConditions;
