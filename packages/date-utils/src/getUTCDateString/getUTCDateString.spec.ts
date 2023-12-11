import { Month } from '../constants';

import { getUTCDateString } from '.';

describe('packages/date-utils/getUTCDateString', () => {
  test('returns date string relative to UTC', () => {
    const date = new Date(Date.UTC(2023, Month.September, 10));
    const str = getUTCDateString(date);
    expect(str).toBe('Sun Sep 10 2023');
  });

  test('returns date string relative with time provided', () => {
    const date = new Date(Date.UTC(2023, Month.September, 10, 12, 0));
    const str = getUTCDateString(date);
    expect(str).toBe('Sun Sep 10 2023');
  });
});
