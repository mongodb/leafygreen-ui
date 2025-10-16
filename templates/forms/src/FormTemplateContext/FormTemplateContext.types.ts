export type FieldDetails =
  | string
  | { displayText: string; learnMoreURL: string }
  | { displayText: string; infoSprinkleText: string };

export interface UniversalFieldProperties {
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
}

export const stringInputTypes = [
  'number',
  'text',
  'email',
  'password',
  'textarea',
] as const;

export interface StringFieldProperties extends UniversalFieldProperties {
  // The type of string input field.
  type: (typeof stringInputTypes)[number]; // Default 'text'

  // Placeholder text for the field.
  placeholder?: string; // No default

  // The current input value
  value: string; // No default

  // The default value for the input
  defaultValue?: string;
}

export interface OptionProperties {
  // The display text for the option.
  label: FieldDetails; // No default

  // The description for the option.
  description?: FieldDetails; // No default

  // The value for the option.
  name: string; // No default

  // Sets this option as the default selected option.
  defaultSelected?: boolean; // Default false
}

export const singleSelectTypes = ['radio', 'radiobox', 'select'] as const;

export interface SingleSelectFieldProperties extends UniversalFieldProperties {
  // The type of single select field.
  type: (typeof singleSelectTypes)[number]; // Default 'radio'

  // A map of options fot the field.
  options: Map<string, OptionProperties>; // No default

  // The current selected value
  value: string; // No default
}

export const multiSelectTypes = ['checkbox', 'select'] as const;

export interface MultiSelectFieldProperties extends UniversalFieldProperties {
  // The type of multi select field.
  type: (typeof multiSelectTypes)[number]; // Default 'checkbox'

  // A map of options for the field.
  options: Map<string, OptionProperties>; // No default

  // The current selected value
  value: string; // No default
}

export type FieldProperties =
  | StringFieldProperties
  | SingleSelectFieldProperties
  | MultiSelectFieldProperties;

export type InternalFieldProperties = 'value' | 'valid';

export type FieldMap = Map<string, FieldProperties>; // String is the field name

export interface ProviderValue {
  fields: {
    fieldProperties: FieldMap;
    invalidFields: Array<string>;
  };
  addField: (
    name: string,
    value: Omit<FieldProperties, 'valid'> & { valid?: boolean },
  ) => void;
  removeField: (name: string) => void;
  setFieldValue: (name: string, value: any) => void;
  clearFormValues: () => void;
}
