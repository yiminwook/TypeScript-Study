/* eslint-disable @typescript-eslint/no-unused-vars */

export interface validatable {
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

export function validation(validatableInput: validatable) {
  let isValid = true;
  const { value, required, minLength, maxLength, min, max } = validatableInput;
  if (required) {
    isValid = isValid && value.toString().trim().length >= 0;
  }
  if (minLength != null && typeof value === 'string') {
    isValid = isValid && value.trim().length >= minLength;
  }
  if (maxLength != null && typeof value === 'string') {
    isValid = isValid && value.trim().length <= maxLength;
  }
  if (min != null && typeof value === 'number') {
    isValid = isValid && value >= min;
  }
  if (max != null && typeof value === 'number') {
    isValid = isValid && value <= max;
  }
  return isValid;
}
