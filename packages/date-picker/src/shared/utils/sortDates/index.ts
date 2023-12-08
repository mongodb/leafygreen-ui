import { isBefore, isSameDay } from 'date-fns';

export const sortDates = (
  dates: Array<Date>,
  direction: 'ascending' | 'descending' = 'descending',
): Array<Date> => {
  const dir = direction === 'ascending' ? -1 : 1;
  return dates.sort((a, b) => {
    return isBefore(a, b) ? dir : isSameDay(a, b) ? 0 : -dir;
  });
};
