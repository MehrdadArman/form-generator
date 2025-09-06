export interface Form {
  id: string;
  name: string;
  elements: Element[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Element {
  id: string;
  type: ElementType;
  label: string;
  isRequired: boolean;
  placeholder?: string;
  conditions?: Condition[];
  choices?: Choice[];
}

export type ElementType = "text" | "checkbox";

export interface Choice {
  id: string;
  name: string;
}

export interface Condition {
  id: string;
  targetElementId: string;
  operator: ConditionOperator;
  value: any;
  logic: "AND" | "OR";
}

export type ConditionOperator =
  | "equals"
  | "not_equals"
  | "contains"
  | "greater_than"
  | "less_than";

export interface FormData {
  [elementId: string]: any;
  conditions: Condition[];
}

export interface ValidationError {
  field: string;
  message: string;
}

// UI State types
export interface UIState {
  isLoading: boolean;
  error: string | null;
}

// Form Builder specific types
export interface FormBuilderState {
  currentForm: Form | null;
  editingElement: Element | null;
  isElementDialogOpen: boolean;
}
