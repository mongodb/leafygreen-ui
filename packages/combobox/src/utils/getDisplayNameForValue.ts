import { OptionObject } from '../Combobox.types';

export const getDisplayNameForValue = (
  value: string | null,
  options: Array<OptionObject>,
): string => {
  return value
    ? options.find(opt => opt.value === value)?.displayName ?? value
    : '';
};

export const getValueForDisplayName = (
  displayName: string | null,
  options: Array<OptionObject>,
): string => {
  return displayName
    ? options.find(opt => opt.displayName === displayName)?.value ?? displayName
    : '';
};
