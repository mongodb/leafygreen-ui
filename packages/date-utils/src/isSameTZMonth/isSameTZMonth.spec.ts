import { Month } from '../constants';
import { newUTC } from '../newUTC';
import { testTimeZones } from '../testing/testValues';

import { isSameTZMonth } from './isSameTZMonth';

describe('packages/date-utils/isSameTZMonth', () => {
  test.each(testTimeZones)('returns true in $tz', ({ tz, UTCOffset }) => {
    if (UTCOffset <= 0) {
      const testUTC = newUTC(2023, Month.November, 30);
      const testZoned = newUTC(2023, Month.December, 1, -(UTCOffset + 1));
      expect(isSameTZMonth(testZoned, testUTC, tz)).toBe(true);
    } else {
      const testUTC = newUTC(2023, Month.December, 1);
      const testZoned = newUTC(2023, Month.November, 30, 24 - UTCOffset);
      expect(isSameTZMonth(testZoned, testUTC, tz)).toBe(true);
    }
  });
});
