import { v4 as uuidv4 } from "uuid";
import type { Form, Element, Condition } from "@types";

export class FormHelperService {
  static generateId(): string {
    return uuidv4();
  }

  static createEmptyForm(name: string = "New Form"): Form {
    return {
      id: this.generateId(),
      name,
      elements: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  static createElement(
    type: string,
    label: string,
    isRequired: boolean = false,
    conditions: Condition[] = []
  ): Element {
    return {
      id: this.generateId(),
      type: type as any,
      label,
      isRequired,
      conditions,
    };
  }

  static updateFormElement(
    form: Form,
    elementId: string,
    updates: Partial<Element>
  ): Form {
    return {
      ...form,
      elements: form.elements.map((element) =>
        element.id === elementId ? { ...element, ...updates } : element
      ),
      updatedAt: new Date(),
    };
  }

  static removeFormElement(form: Form, elementId: string): Form {
    return {
      ...form,
      elements: form.elements.filter((element) => element.id !== elementId),
      updatedAt: new Date(),
    };
  }
}
