import * as yup from "yup";
import type { Element, ElementType } from "@types";
import { VALIDATION_MESSAGES } from "@/constants";

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

    if (element.isRequired) {
      return baseSchema.required(VALIDATION_MESSAGES(element.label).REQUIRED);
    }

    return baseSchema;
  }

  private static getBaseSchema(type: ElementType): yup.Schema {
    switch (type) {
      case "text":
        return yup.string();
      case "checkbox":
        return yup.boolean();
      default:
        return yup.mixed();
    }
  }

  static validateFormData(
    data: Record<string, any>,
    elements: Element[]
  ): Record<string, string> {
    const errors: Record<string, string> = {};

    elements.forEach((element) => {
      const value = data[element.id];

      if (element.isRequired && this.isEmpty(value)) {
        errors[element.id] = VALIDATION_MESSAGES(element.label).REQUIRED;
      }
    });

    return errors;
  }

  private static isEmpty(value: any): boolean {
    return value === null || value === undefined || value === "";
  }
}
