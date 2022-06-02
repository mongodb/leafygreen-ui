import { OptionObject } from '../Combobox.types';

export const getOptionObjectFromValue = (
  value: string | null,
  options: Array<OptionObject>,
): OptionObject | undefined => {
  if (value) return options.find(opt => opt.value === value);
};

export const getDisplayNameForValue = (
  value: string | null,
  options: Array<OptionObject>,
): string => {
  return value
    ? getOptionObjectFromValue(value, options)?.displayName ?? value
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
