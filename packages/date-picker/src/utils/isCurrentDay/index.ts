import { isToday } from 'date-fns';

export const isCurrentDay = (day?: Date | null): day is Date => {
  return !!(day && isToday(day));
};
