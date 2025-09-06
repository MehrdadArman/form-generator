import * as yup from "yup";
import type { Element, ElementType, Condition, FormData } from "@types";
import { VALIDATION_MESSAGES, CONDITION_OPERATORS } from "@/constants";
import { ConditionalLogicService } from "./conditionalLogic";

export class ValidationService {
  static createSchema(elements: Element[]): yup.ObjectSchema<any> {
    const schemaFields: Record<string, yup.Schema> = {};

    elements.forEach((element) => {
      schemaFields[element.id] = this.createFieldSchema(element);
    });

    return yup.object().shape(schemaFields);
  }

  private static createFieldSchema(element: Element): yup.Schema {
    const baseSchema = this.getBaseSchema(element.type);
    let schema = baseSchema;

    // Add required validation
    if (element.isRequired) {
      schema = schema.required(VALIDATION_MESSAGES(element.label).REQUIRED);
    }

    // Add conditional validation
    if (element.conditions && element.conditions.length > 0) {
      schema = schema.test(
        "conditional-validation",
        VALIDATION_MESSAGES(element.label).CONDITIONS_NOT_MET,
        function () {
          const formData = this.parent as FormData;
          return ValidationService.evaluateConditionalValidation(
            element,
            formData
          );
        }
      );
    }

    return schema;
  }

  private static getBaseSchema(type: ElementType): yup.Schema {
    switch (type) {
      case "text":
        return yup.string().nullable();
      case "checkbox":
        return yup.boolean().nullable();
      default:
        return yup.mixed().nullable();
    }
  }

  /**
   * Evaluates conditional validation for an element
   * This method determines if an element should be validated based on its conditions
   */
  static evaluateConditionalValidation(
    element: Element,
    formData: FormData
  ): boolean {
    if (!element.conditions || element.conditions.length === 0) {
      return true; // No conditions, always valid
    }

    // Check if the element should be shown based on conditions
    const shouldShow = ConditionalLogicService.shouldShowElement(
      element,
      formData
    );

    if (!shouldShow) {
      return true; // Element is hidden, so it's valid
    }

    // Element is visible, now check if it meets its own conditions
    return this.evaluateElementConditions(element, formData);
  }

  /**
   * Evaluates the conditions for a specific element
   */
  private static evaluateElementConditions(
    element: Element,
    formData: FormData
  ): boolean {
    if (!element.conditions || element.conditions.length === 0) {
      return true;
    }

    try {
      // Use the same logic as ConditionalLogicService for consistency
      return ConditionalLogicService.shouldShowElement(element, formData);
    } catch (error) {
      console.warn(
        `Error evaluating conditions for element ${element.id}:`,
        error
      );
      return true; // Default to valid if condition evaluation fails
    }
  }

  /**
   * Validates form data against all elements with proper condition handling
   */
  static validateFormData(
    data: FormData,
    elements: Element[]
  ): Record<string, string> {
    const errors: Record<string, string> = {};

    elements.forEach((element) => {
      const value = data[element.id];

      // Check if element should be visible based on conditions
      const shouldShow = ConditionalLogicService.shouldShowElement(
        element,
        data
      );

      if (!shouldShow) {
        return;
      }

      // Validate required fields
      if (element.isRequired && this.isEmpty(value)) {
        errors[element.id] = VALIDATION_MESSAGES(element.label).REQUIRED;
        return;
      }

      // Validate conditions
      if (element.conditions && element.conditions.length > 0) {
        const conditionsMet = this.evaluateElementConditions(element, data);
        if (!conditionsMet) {
          errors[element.id] = VALIDATION_MESSAGES(
            element.label
          ).CONDITIONS_NOT_MET;
        }
      }

      this.validateFieldType(element, value, errors);
    });

    return errors;
  }

  private static validateFieldType(
    element: Element,
    value: any,
    errors: Record<string, string>
  ): void {
    if (this.isEmpty(value)) {
      return; // Skip type validation for empty values
    }

    switch (element.type) {
      case "text":
        if (typeof value !== "string") {
          errors[element.id] = `${element.label} must be a text value`;
        }
        break;
      case "checkbox":
        if (typeof value !== "boolean") {
          errors[element.id] = `${element.label} must be a boolean value`;
        }
        break;
    }
  }

  static createDynamicSchema(
    elements: Element[],
    formData: FormData
  ): yup.ObjectSchema<any> {
    const schemaFields: Record<string, yup.Schema> = {};

    elements.forEach((element) => {
      const shouldShow = ConditionalLogicService.shouldShowElement(
        element,
        formData
      );

      if (shouldShow) {
        schemaFields[element.id] = this.createFieldSchema(element);
      }
    });

    return yup.object().shape(schemaFields);
  }

  static validateCondition(condition: Condition, formData: FormData): boolean {
    const targetValue = formData[condition.targetElementId];
    const expectedValue = condition.value;

    switch (condition.operator) {
      case CONDITION_OPERATORS.EQUALS:
        return targetValue === expectedValue;

      case CONDITION_OPERATORS.NOT_EQUALS:
        return targetValue !== expectedValue;

      case CONDITION_OPERATORS.CONTAINS:
        return (
          typeof targetValue === "string" && targetValue.includes(expectedValue)
        );

      case CONDITION_OPERATORS.GREATER_THAN:
        return Number(targetValue) > Number(expectedValue);

      case CONDITION_OPERATORS.LESS_THAN:
        return Number(targetValue) < Number(expectedValue);

      default:
        return false;
    }
  }

  private static isEmpty(value: any): boolean {
    if (value === null || value === undefined) {
      return true;
    }

    if (typeof value === "string") {
      return value.trim() === "";
    }

    if (typeof value === "boolean") {
      return false; // Boolean values are never "empty"
    }

    return false;
  }
}
