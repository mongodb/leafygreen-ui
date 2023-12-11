import { Month } from '../constants';
import { newUTC } from '../newUTC';

import { sortDates } from '.';

describe('packages/date-utils/sortDates', () => {
  const testDates = [
    newUTC(2023, Month.September, 10),
    newUTC(2020, Month.March, 13),
    newUTC(2023, Month.September, 10),
    newUTC(2020, Month.March, 10),
  ];

  test('ascending', () => {
    expect(sortDates(testDates, 'ascending')).toEqual([
      newUTC(2020, Month.March, 10),
      newUTC(2020, Month.March, 13),
      newUTC(2023, Month.September, 10),
      newUTC(2023, Month.September, 10),
    ]);
  });

  test('descending', () => {
    expect(sortDates(testDates, 'descending')).toEqual([
      newUTC(2023, Month.September, 10),
      newUTC(2023, Month.September, 10),
      newUTC(2020, Month.March, 13),
      newUTC(2020, Month.March, 10),
    ]);
  });

  test('ascending by default', () => {
    expect(sortDates(testDates)).toEqual([
      newUTC(2020, Month.March, 10),
      newUTC(2020, Month.March, 13),
      newUTC(2023, Month.September, 10),
      newUTC(2023, Month.September, 10),
    ]);
  });
});
