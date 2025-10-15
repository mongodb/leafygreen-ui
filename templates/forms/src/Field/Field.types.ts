// Properties common to all field types
export interface UniversalFieldProps {
  // The name of the field.
  // This will be used as the key in the field map, for accessibility attributes, and any needed identifiers.
  // This value will also be used as the key to the values returned on submit.
  name: string;

  // The label for the field.
  label: string;

  // The description for the field.
  description?: string; // No default

  // If provided, provides a contextual error message for the field.
  errorMessage?: string; // No default
}
