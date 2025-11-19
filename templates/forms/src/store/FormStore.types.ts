/**
 * Function used to create custom field validation rules. This function should be memoized using useCallback() if possible to prevent unnecessary re-rendering of the field.
 *
 * @param {any} value - The current value of the input to be validated. This value is based on the type of field being declared.
 * @returns {boolean | Promise<boolean>} a boolean, or a promise that resolves to a boolean representing whether or not the value adheres to the custom validation rules. If the return value is a promise, the form will handle loading behaviors and the correct display patterns until the promise resolves.
 *
 * @example
 * Checks if the value is exactly the string 'hello':
 * ```js
 * function(value) {
 *   return value === 'hello';
 * }
 * ```
 *
 * @example
 * Validates server-side if a value is valid.
 * ```js
 * async function(value) {
 *   const response = await fetch('example.com/api/validate-entry', {
 *     method: "POST",
 *     body: JSON.stringify({ value }),
 *   });
 *   const result = await response.json();
 *
 *   return result.valid;
 * }
 * ```
 * */
export type ValidatorFunction<T = any> = (value: T) => boolean; // TODO: Add promise return support

export type FieldDetails =
  | string
  | { displayText: string; learnMoreURL: string }
  | { displayText: string; infoSprinkleText: string };

export interface UniversalFieldProperties<T = string> {
  // Set to true if the field is required
  required?: boolean; // Default false

  // The label to display for the field.
  label: string; // No default

  // The description to display for the field.
  description?: FieldDetails; // No default

  // When set, this will display an error message specific to this field.
  errorMessage?: FieldDetails; // No default

  // Whether the current value of the field is considered valid.
  // Will take into account whether a field is required, as well as custom validation.
  valid: boolean;

  // The default value for the input
  defaultValue?: T;
}

export const stringInputTypes = [
  'number',
  'text',
  'email',
  'password',
  'textarea',
] as const;

export interface StringFieldProperties<T = string>
  extends UniversalFieldProperties<T> {
  // The type of string input field.
  type: (typeof stringInputTypes)[number]; // Default 'text'

  // Placeholder text for the field.
  placeholder?: string; // No default

  // The current input value
  value: T; // No default

  // Custom validation function for the field
  validator?: ValidatorFunction<T>;
}

export interface OptionProperties {
  // The display text for the option.
  label: FieldDetails; // No default

  // The description for the option.
  description?: FieldDetails; // No default

  // The value for the option.
  // Must be unique amongst options in the field, but can be repeated within the form.
  name: string; // No default

  // Sets this option as the default selected option.
  defaultSelected?: boolean; // Default false
}

export const singleSelectTypes = ['radio', 'radiobox', 'select'] as const;

export interface SingleSelectFieldProperties<T = string>
  extends UniversalFieldProperties {
  // The type of single select field.
  type: (typeof singleSelectTypes)[number]; // Default 'radio'

  // A map of options fot the field.
  options: Map<string, OptionProperties>; // No default

  // The current selected value
  value: T; // No default

  // Custom validation function for the field
  validator?: ValidatorFunction<T>;
}

export const multiSelectTypes = ['checkbox', 'select'] as const;

export interface MultiSelectFieldProperties<T = string>
  extends UniversalFieldProperties {
  // The type of multi select field.
  type: (typeof multiSelectTypes)[number]; // Default 'checkbox'

  // A map of options for the field.
  options: Map<string, OptionProperties>; // No default

  // The current selected value
  value: T; // No default

  // Custom validation function for the field
  validator?: ValidatorFunction<T>;
}

export type FieldProperties =
  | StringFieldProperties
  | SingleSelectFieldProperties
  | MultiSelectFieldProperties;

export type InternalFieldProperties = 'value' | 'valid' | 'options';

export type FieldMap = Map<string, FieldProperties>; // String is the field name
