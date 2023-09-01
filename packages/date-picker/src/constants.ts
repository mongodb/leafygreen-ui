import { range } from 'lodash';

import { getMonthName } from './utils/getMonthName';

// Compute the long & short form of each month
export const Months: Array<{
  long: string;
  short: string;
}> = range(12).map(m => getMonthName(m));
