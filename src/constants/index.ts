export const ELEMENT_TYPES = {
  TEXT: "text" as const,
  CHECKBOX: "checkbox" as const,
  SELECT: "select" as const,
  TEXTAREA: "textarea" as const,
} as const;

export const CONDITION_OPERATORS = {
  EQUALS: "equals" as const,
  NOT_EQUALS: "not_equals" as const,
  CONTAINS: "contains" as const,
  GREATER_THAN: "greater_than" as const,
  LESS_THAN: "less_than" as const,
} as const;

export const LOGIC_OPERATORS = {
  AND: "AND" as const,
  OR: "OR" as const,
} as const;

export const VALIDATION_MESSAGES = (label?: string) =>
  ({
    REQUIRED: `${label} is required`,
    FORM_IS_NOT_VALID: "Form is not valid",
    ELEMENT_IS_NOT_VALID: "Element label is not valid",
    MIN_LENGTH: (min: number) => `Minimum length is ${min} characters`,
    MAX_LENGTH: (max: number) => `Maximum length is ${max} characters`,
  } as const);

export const STORAGE_KEYS = {
  FORMS: "form-generator-forms",
  CURRENT_FORM: "form-generator-current-form",
} as const;
