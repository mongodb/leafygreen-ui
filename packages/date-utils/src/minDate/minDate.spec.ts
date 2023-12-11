import { Month } from '../constants';
import { newUTC } from '../newUTC';

import { minDate } from '.';

describe('packages/date-utils/minDate', () => {
  test('returns the first date', () => {
    expect(
      minDate([
        newUTC(2020, Month.January, 1),
        newUTC(2020, Month.January, 2),
        newUTC(2020, Month.January, 3),
      ]),
    ).toEqual(newUTC(2020, Month.January, 1));
  });

  test('returns the first date within seconds', () => {
    expect(
      minDate([
        newUTC(2020, Month.January, 1, 12, 0, 0),
        newUTC(2020, Month.January, 1, 12, 0, 1),
        newUTC(2020, Month.January, 1, 11, 59, 59),
      ]),
    ).toEqual(newUTC(2020, Month.January, 1, 11, 59, 59));
  });

  test('when array elements are null/undefined', () => {
    expect(
      minDate([
        newUTC(2020, Month.January, 1),
        null,
        newUTC(2020, Month.January, 2),
        undefined,
        newUTC(2020, Month.January, 3),
      ]),
    ).toEqual(newUTC(2020, Month.January, 1));
  });

  test('returns undefined for invalid array', () => {
    expect(minDate([])).toBeUndefined();
  });
});
