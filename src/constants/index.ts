export const CONDITION_OPERATORS = {
  EQUALS: "equals",
  NOT_EQUALS: "not_equals",
  CONTAINS: "contains",
  GREATER_THAN: "greater_than",
  LESS_THAN: "less_than",
} as const;

export const LOGIC_OPERATORS = {
  AND: "AND",
  OR: "OR",
} as const;

export const VALIDATION_MESSAGES = (label?: string) =>
  ({
    REQUIRED: `${label} is required`,
    FORM_IS_NOT_VALID: "Form is not valid",
    ELEMENT_IS_NOT_VALID: "Element label is not valid",
    CONDITIONS_NOT_MET: "Conditions are not met",
    MIN_LENGTH: (min: number) => `Minimum length is ${min} characters`,
    MAX_LENGTH: (max: number) => `Maximum length is ${max} characters`,
  } as const);
