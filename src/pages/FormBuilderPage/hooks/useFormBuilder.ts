import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";

import { VALIDATION_MESSAGES } from "@/constants";
import { routePaths } from "@/routes/routePathes";
import { useFormStore } from "@/store/formStore";
import type { Form, Element } from "@/types";
import { FormHelperService } from "@/utils/formHelpers";

// Constants
const DEFAULT_ELEMENT: Partial<Element> = {
  type: "text",
  label: "",
  isRequired: false,
  conditions: [],
};

// Types
interface UseFormBuilderReturn {
  // State
  elements: Element[];
  formName: string;
  isElementDialogOpen: boolean;
  editingElement: Element | null;
  newElement: Partial<Element>;

  // Actions
  handleAddElement: () => void;
  handleUpdateElement: () => void;
  handleEditElement: (element: Element) => void;
  handleDeleteElement: (elementId: string) => void;
  handleSaveForm: () => void;
  resetElementForm: () => void;

  // Setters
  setFormName: (name: string) => void;
  setIsElementDialogOpen: (open: boolean) => void;
  setEditingElement: (element: Element | null) => void;
  setNewElement: (element: Partial<Element>) => void;
}

// Helper functions
const validateElement = (element: Partial<Element>): boolean => {
  return !!(element.type && element.label);
};

const validateForm = (formName: string, elements: Element[]): boolean => {
  return !!(formName?.trim() && elements.length > 0);
};

const createFormData = (
  currentForm: Form,
  formName: string,
  elements: Element[]
): Form => {
  return {
    ...currentForm,
    name: formName.trim(),
    elements,
    updatedAt: new Date(),
  };
};

const closeElementDialog = (
  setIsElementDialogOpen: (open: boolean) => void,
  setEditingElement: (element: Element | null) => void,
  resetElementForm: () => void
) => {
  setIsElementDialogOpen(false);
  setEditingElement(null);
  resetElementForm();
};

// Main hook
const useFormBuilder = (): UseFormBuilderReturn => {
  // Store and navigation
  const { currentForm, addForm, setCurrentForm, forms, updateForm } =
    useFormStore();
  const navigate = useNavigate();

  // State
  const [elements, setElements] = useState<Element[]>(currentForm.elements);
  const [formName, setFormName] = useState(currentForm.name);
  const [isElementDialogOpen, setIsElementDialogOpen] = useState(false);
  const [editingElement, setEditingElement] = useState<Element | null>(null);
  const [newElement, setNewElement] =
    useState<Partial<Element>>(DEFAULT_ELEMENT);

  // Element management
  const handleAddElement = useCallback(() => {
    if (!validateElement(newElement)) {
      enqueueSnackbar(
        VALIDATION_MESSAGES(newElement.label).ELEMENT_IS_NOT_VALID,
        { variant: "error" }
      );
      return;
    }

    const element = FormHelperService.createElement(
      newElement.type!,
      newElement.label!,
      newElement.isRequired || false
    );

    setElements((prev) => [...prev, element]);
    closeElementDialog(
      setIsElementDialogOpen,
      setEditingElement,
      resetElementForm
    );
  }, [newElement]);

  const handleUpdateElement = useCallback(() => {
    if (!editingElement) return;

    const updatedElements = elements.map((el) =>
      el.id === editingElement.id ? ({ ...el, ...newElement } as Element) : el
    );

    setElements(updatedElements);
    closeElementDialog(
      setIsElementDialogOpen,
      setEditingElement,
      resetElementForm
    );
  }, [editingElement, elements, newElement]);

  const handleEditElement = useCallback(
    (element: Element) => {
      setEditingElement(element);
      setNewElement(element);
      setIsElementDialogOpen(true);

      const updatedForm = FormHelperService.updateFormElement(
        currentForm,
        element.id,
        element
      );

      updateForm(currentForm.id, updatedForm);
    },
    [currentForm.id, elements, updateForm]
  );

  const handleDeleteElement = useCallback((elementId: string) => {
    setElements((prev) => prev.filter((el) => el.id !== elementId));
  }, []);

  // Form management
  const handleSaveForm = useCallback(() => {
    if (!validateForm(formName, elements)) {
      enqueueSnackbar(VALIDATION_MESSAGES().FORM_IS_NOT_VALID, {
        variant: "error",
      });
      return;
    }

    const formData = createFormData(currentForm, formName, elements);
    const isExistingForm = forms.some((f) => f.id === currentForm.id);

    if (isExistingForm) {
      updateForm(currentForm.id, formData);
    } else {
      addForm(formData);
    }

    setCurrentForm(null);
    navigate(routePaths.HOMEPAGE);
    enqueueSnackbar("Form saved successfully", { variant: "success" });
  }, [
    currentForm,
    formName,
    elements,
    forms,
    updateForm,
    addForm,
    setCurrentForm,
    navigate,
  ]);

  const resetElementForm = useCallback(() => {
    setNewElement(DEFAULT_ELEMENT);
  }, []);

  // Return object
  return {
    // State
    elements,
    formName,
    isElementDialogOpen,
    editingElement,
    newElement,

    // Actions
    handleAddElement,
    handleUpdateElement,
    handleEditElement,
    handleDeleteElement,
    handleSaveForm,
    resetElementForm,

    // Setters
    setFormName,
    setIsElementDialogOpen,
    setEditingElement,
    setNewElement,
  };
};

export default useFormBuilder;
