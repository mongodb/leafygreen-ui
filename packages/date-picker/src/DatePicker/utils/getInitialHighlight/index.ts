import { DateType, isSameUTCMonth, isValidDate } from '../../../shared';

/** Returns the initial highlight value when the date picker is first */
export const getInitialHighlight = (
  value: DateType | undefined,
  today: Date,
  month: Date,
) => {
  if (isValidDate(value)) return value;
  if (isSameUTCMonth(today, month)) return today;
  return month;
};
