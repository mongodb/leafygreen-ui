import {
  stringInputTypes,
  singleSelectTypes,
  multiSelectTypes,
  FieldProperties,
  StringFieldProperties,
  SingleSelectFieldProperties,
  MultiSelectFieldProperties,
} from '../store/FormStore.types';

// Checks if a set of field properties is for a string input
export const isStringInput = (
  properties: FieldProperties,
): properties is StringFieldProperties =>
  stringInputTypes.includes(properties.type as any);

// Checks if a set of field properties is for a single select
export const isSingleSelect = (
  properties: FieldProperties,
): properties is SingleSelectFieldProperties =>
  singleSelectTypes.includes(properties.type as any);

// Checks if a set of field properties is for a multi select
export const isMultiSelect = (
  properties: FieldProperties,
): properties is MultiSelectFieldProperties =>
  multiSelectTypes.includes(properties.type as any);
