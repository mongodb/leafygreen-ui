import { SelectValueType } from '../../types';

/**
 * Returns whether a given value is included in, or equal to, the current selection
 * @param value the option value to check
 */
export const isValueCurrentSelection = (
  value: string,
  selection: SelectValueType<boolean> | null,
): boolean => {
  return Array.isArray(selection)
    ? selection.includes(value)
    : value === selection;
};
