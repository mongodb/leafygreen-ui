import { DateType, isValidDate } from '@leafygreen-ui/date-utils';

/** Returns the initial highlight value when the date picker is opened */
export const getInitialHighlight = (
  value: DateType | undefined,
  today: Date,
) => {
  if (isValidDate(value)) return value;
  return today;
};
