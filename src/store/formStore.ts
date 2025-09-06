import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Form, FormData, UIState } from "@types";
import { v4 as uuidv4 } from "uuid";

// Create initial form function
const createInitialForm = (): Form => ({
  id: uuidv4(),
  name: "New Form",
  elements: [],
  createdAt: new Date(),
  updatedAt: new Date(),
});

interface FormOperations {
  forms: Form[];
  addForm: (form: Form) => void;
  updateForm: (id: string, form: Form) => void;
  deleteForm: (id: string) => void;
  getFormById: (id: string) => Form | undefined;
}

interface FormState {
  currentForm: Form;
  formData: FormData;
  setCurrentForm: (form: Form | null) => void;
  updateFormData: (data: FormData) => void;
  clearFormData: () => void;
}

interface UIStateOperations {
  uiState: UIState;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

interface FormStore extends FormOperations, FormState, UIStateOperations {}

// Helper function to update form with proper timestamps
const updateFormWithTimestamp = (form: Form): Form => ({
  ...form,
  updatedAt: new Date(),
});

export const useFormStore = create<FormStore>()(
  persist(
    // Initialize first form if no forms exist
    (set, get) => {
      return {
        forms: [],
        addForm: (form: Form) => {
          set((state) => ({
            forms: [...state.forms, form],
          }));
        },

        updateForm: (id: string, updates: Partial<Form>) => {
          set((state) => {
            const updatedForms = state.forms.map((form) =>
              form.id === id
                ? updateFormWithTimestamp({ ...form, ...updates })
                : form
            );

            const updatedCurrentForm =
              state.currentForm?.id === id
                ? updateFormWithTimestamp({ ...state.currentForm, ...updates })
                : state.currentForm;

            return {
              forms: updatedForms,
              currentForm: updatedCurrentForm,
            };
          });
        },

        deleteForm: (id: string) => {
          set((state) => ({
            forms: state.forms.filter((f) => f.id !== id),
          }));
        },

        getFormById: (id: string) => {
          return get().forms.find((form) => form.id === id);
        },

        clearFormData: () => {
          set({ formData: { conditions: [] } });
        },

        setCurrentForm: (form: Form | null) => {
          set({ currentForm: form || createInitialForm() });
        },

        updateFormData: (data: FormData) => {
          set((state) => ({
            formData: { ...state.formData, ...data },
          }));
        },

        // Form state
        currentForm: createInitialForm(),
        formData: {
          conditions: [],
        },

        // UI state
        uiState: {
          isLoading: false,
          error: null,
        },

        setLoading: (loading: boolean) => {
          set((state) => ({
            uiState: { ...state.uiState, isLoading: loading },
          }));
        },

        setError: (error: string | null) => {
          set((state) => ({
            uiState: { ...state.uiState, error },
          }));
        },

        clearError: () => {
          set((state) => ({
            uiState: { ...state.uiState, error: null },
          }));
        },
      };
    },
    {
      name: "form-generator-storage",
      partialize: (state) => ({
        forms: state.forms,
        currentForm: state.currentForm,
      }),
      onRehydrateStorage: () => (state) => {
        if (state && state.forms.length === 0 && !state.currentForm) {
          const newForm = createInitialForm();
          state.currentForm = newForm;
        }
      },
    }
  )
);
