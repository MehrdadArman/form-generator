import type { Element, Condition, FormData } from "@types";

export class ConditionalLogicService {
  static shouldShowElement(element: Element, formData: FormData): boolean {
    if (!element.conditions || element.conditions.length === 0) {
      return true;
    }

    return this.evaluateConditions(element.conditions, formData);
  }

  private static evaluateConditions(
    conditions: Condition[],
    formData: FormData
  ): boolean {
    if (conditions.length === 1) {
      return this.evaluateCondition(conditions[0], formData);
    }

    // Handle multiple conditions with AND/OR logic
    const results = conditions.map((condition) =>
      this.evaluateCondition(condition, formData)
    );
    const logic = conditions[0].logic || "AND";

    return logic === "AND"
      ? results.every((result) => result)
      : results.some((result) => result);
  }

  private static evaluateCondition(
    condition: Condition,
    formData: FormData
  ): boolean {
    const targetValue = formData[condition.targetElementId];
    const expectedValue = condition.value;

    switch (condition.operator) {
      case "equals":
        return targetValue === expectedValue;
      case "not_equals":
        return targetValue !== expectedValue;
      case "contains":
        return (
          typeof targetValue === "string" && targetValue.includes(expectedValue)
        );
      case "greater_than":
        return Number(targetValue) > Number(expectedValue);
      case "less_than":
        return Number(targetValue) < Number(expectedValue);
      default:
        return false;
    }
  }
}
