import { getMonthName } from '../getMonthName';

/** Returns a long month label (i.e. September 2023) */
export const getFullMonthLabel = (date: Date): string => {
  return getMonthName(date.getUTCMonth()).long + ' ' + date.getUTCFullYear();
};
