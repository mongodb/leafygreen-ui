import { Month } from '../constants';
import { newUTC } from '../newUTC';

import { maxDate } from '.';

describe('packages/date-utils/maxDate', () => {
  test('returns the last date', () => {
    expect(
      maxDate([
        newUTC(2020, Month.January, 1),
        newUTC(2020, Month.January, 2),
        newUTC(2020, Month.January, 3),
      ]),
    ).toEqual(newUTC(2020, Month.January, 3));
  });

  test('returns the last date within seconds', () => {
    expect(
      maxDate([
        newUTC(2020, Month.January, 1, 12, 0, 0),
        newUTC(2020, Month.January, 1, 12, 0, 1),
        newUTC(2020, Month.January, 1, 11, 59, 59),
      ]),
    ).toEqual(newUTC(2020, Month.January, 1, 12, 0, 1));
  });

  test('when array elements are null/undefined', () => {
    expect(
      maxDate([
        newUTC(2020, Month.January, 1),
        null,
        newUTC(2020, Month.January, 2),
        undefined,
        newUTC(2020, Month.January, 3),
      ]),
    ).toEqual(newUTC(2020, Month.January, 3));
  });

  test('returns undefined for invalid array', () => {
    expect(maxDate([])).toBeUndefined();
  });
});
