import { Month } from '../constants';
import { newUTC } from '../newUTC';

import { setUTCDate } from '.';

describe('packages/date-utils/setUTCDate', () => {
  test('at noon', () => {
    expect(setUTCDate(newUTC(2020, Month.July, 4, 12, 0), 5)).toEqual(
      newUTC(2020, Month.July, 5, 12, 0, 0),
    );
  });
  test('at midnight', () => {
    expect(setUTCDate(newUTC(2020, Month.July, 4, 0, 0), 5)).toEqual(
      newUTC(2020, Month.July, 5, 0, 0, 0),
    );
  });
  test('at 11:59pm', () => {
    expect(setUTCDate(newUTC(2020, Month.July, 4, 23, 59), 5)).toEqual(
      newUTC(2020, Month.July, 5, 23, 59),
    );
  });
});
