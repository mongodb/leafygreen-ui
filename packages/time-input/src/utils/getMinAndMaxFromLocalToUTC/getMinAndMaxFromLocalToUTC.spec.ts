import { newUTC } from '@leafygreen-ui/date-utils';
import { Month } from '@leafygreen-ui/date-utils';

import { getMinAndMaxFromLocalToUTC } from './getMinAndMaxFromLocalToUTC';

describe('packages/time-input/utils/getMinAndMaxFromLocalToUTC', () => {
  const min = newUTC(2025, Month.January, 1, 2, 30, 0); // January 1, 2025 02:30:00 UTC
  const max = newUTC(2025, Month.February, 1, 20, 30, 10); // February 1, 2025 20:30:10 UTC
  const newDate = newUTC(2025, Month.March, 1); // March 1, 2025 00:00:00 UTC

  test('When the time zone is UTC, it returns the min and max UTC date objects', () => {
    const { minUTC, maxUTC } = getMinAndMaxFromLocalToUTC({
      newDate,
      min,
      max,
      timeZone: 'UTC',
    });

    expect(minUTC).toEqual(newUTC(2025, Month.March, 1, 2, 30, 0));
    expect(maxUTC).toEqual(newUTC(2025, Month.March, 1, 20, 30, 10));
  });

  test('When the time zone is America/New_York, it returns the min and max UTC date objects', () => {
    const { minUTC, maxUTC } = getMinAndMaxFromLocalToUTC({
      newDate,
      min,
      max,
      timeZone: 'America/New_York',
    });

    // March 1, 2025 00:00:00Z is February 28, 2025 19:00:00 in America/New_York
    // February 28, 2025 02:30:00 in America/New_York is February 28, 2025 07:30:00 UTC
    // February 28, 2025 20:30:10 in America/New_York is March 1, 2025 01:30:10 UTC

    expect(minUTC).toEqual(newUTC(2025, Month.February, 28, 7, 30, 0));
    expect(maxUTC).toEqual(newUTC(2025, Month.March, 1, 1, 30, 10));
  });

  test('When the time zone is Pacific/Kiritimati, it returns the min and max UTC date objects', () => {
    const { minUTC, maxUTC } = getMinAndMaxFromLocalToUTC({
      newDate,
      min,
      max,
      timeZone: 'Pacific/Kiritimati',
    });

    // March 1, 2025 00:00:00Z is March 1, 2025 14:00:00 in Pacific/Kiritimati
    // March 1, 2025 02:30:00 in Pacific/Kiritimati is February 28, 2025 12:30:00 UTC
    // March 1, 2025 20:30:10 in Pacific/Kiritimati is March 1, 2025 06:30:10 UTC

    expect(minUTC).toEqual(newUTC(2025, Month.February, 28, 12, 30, 0));
    expect(maxUTC).toEqual(newUTC(2025, Month.March, 1, 6, 30, 10));
  });
});
