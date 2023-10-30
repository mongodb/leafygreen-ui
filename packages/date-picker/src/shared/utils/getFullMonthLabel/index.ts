import { Months } from '../../shared/constants';

/** Returns a long month label (i.e. September 2023) */
export const getFullMonthLabel = (date: Date): string => {
  return Months[date.getUTCMonth()].long + ' ' + date.getUTCFullYear();
};
