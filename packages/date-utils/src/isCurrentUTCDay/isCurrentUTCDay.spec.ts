import { Month } from '../constants';
import { newUTC } from '../newUTC';

import { isCurrentUTCDay } from '.';

describe('packages/date-utils/isCurrentUTCDay', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  test('returns true when given UTC dates', () => {
    const midnightUTC = newUTC(2020, Month.December, 25, 0, 0);
    const elevenUTC = newUTC(2020, Month.December, 25, 23, 59);
    jest.setSystemTime(midnightUTC);
    expect(isCurrentUTCDay(elevenUTC)).toBe(true);
  });

  test('returns false when different UTC dates', () => {
    const midnightUTC = newUTC(2020, Month.December, 25, 0, 0);
    const elevenUTC_prev = newUTC(2020, Month.December, 24, 23, 59);
    jest.setSystemTime(midnightUTC);
    expect(isCurrentUTCDay(elevenUTC_prev)).toBe(false);
  });
});
