import { Month } from '../constants';
import { newUTC } from '../newUTC';

import { getUTCDateString } from '.';

describe('packages/date-utils/getUTCDateString', () => {
  // TODO: Test in multiple time zones with a properly mocked Date object
  test('returns date string relative to UTC', () => {
    const date = newUTC(2023, Month.September, 10);
    const str = getUTCDateString(date);
    expect(str).toBe('Sunday, September 10, 2023');
  });

  test.todo('returns a localized date string');
});
