import { DateType, isValidDate } from '../../../shared';

/** Returns the initial highlight value when the date picker is opened */
export const getInitialHighlight = (
  value: DateType | undefined,
  today: Date,
) => {
  if (isValidDate(value)) return value;
  return today;
};
