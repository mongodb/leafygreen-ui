import tzMock from 'timezone-mock';

import { Month } from '../constants';

import { setUTCMonth } from '.';

describe('packages/date-utils/setUTCMonth', () => {
  test('sets the month', () => {
    const d = new Date(Date.UTC(2023, Month.September, 10));
    const d2 = setUTCMonth(d, Month.March);
    expect(d2.getUTCMonth()).toEqual(Month.March);
  });

  test('returns a new object', () => {
    const d = new Date(Date.UTC(2023, Month.September, 10));
    const d2 = setUTCMonth(d, Month.September);
    expect(d).toStrictEqual(d2);
    expect(d).not.toBe(d2);
  });

  test('overflows for months >= 12', () => {
    const d = new Date(Date.UTC(2023, Month.September, 10));
    const d2 = setUTCMonth(d, 12);
    expect(d2.getUTCMonth()).toEqual(Month.January);
  });

  test('under-flows for months < 0', () => {
    const d = new Date(Date.UTC(2023, Month.September, 10));
    const d2 = setUTCMonth(d, -1);
    expect(d2.getUTCMonth()).toEqual(Month.December);
  });

  test('does not care about time-zone', () => {
    tzMock.register('US/Pacific');

    const d = new Date(Date.UTC(2023, Month.September, 1, 0, 0, 0));
    const d_utc = setUTCMonth(d, Month.August);
    expect(d_utc.getUTCMonth()).toEqual(Month.August);
  });
});
