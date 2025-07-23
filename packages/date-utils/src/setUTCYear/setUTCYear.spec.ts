import { Month } from '../constants';
import { newUTC } from '../newUTC';

import { setUTCYear } from '.';

describe('packages/date-utils/setUTCYear', () => {
  test('sets the year of a date', () => {
    expect(setUTCYear(newUTC(2020, Month.July, 5), 2023)).toEqual(
      newUTC(2023, Month.July, 5),
    );
  });
  test('on December 31', () => {
    expect(setUTCYear(newUTC(2020, Month.December, 31, 23, 59), 2023)).toEqual(
      newUTC(2023, Month.December, 31, 23, 59),
    );
  });
  test('on January 1', () => {
    expect(setUTCYear(newUTC(2020, Month.January, 1, 0, 0), 2023)).toEqual(
      newUTC(2023, Month.January, 1, 0, 0),
    );
  });
});
