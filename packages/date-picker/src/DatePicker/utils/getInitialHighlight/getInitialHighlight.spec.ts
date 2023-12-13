import { Month, newUTC } from '@leafygreen-ui/date-utils';
import { testTimeZones } from '@leafygreen-ui/date-utils';

import { getInitialHighlight } from '.';

describe('packages/date-picker/utils/getInitialHighlight', () => {
  const value = newUTC(2023, Month.September, 10);
  const today = newUTC(2023, Month.December, 25, 1);

  describe.each(testTimeZones)('for timeZone $tz', ({ tz, UTCOffset }) => {
    test('returns `value` when provided', () => {
      const highlight = getInitialHighlight(value, today, tz);
      expect(highlight).toEqual(value);
    });

    test('returns `today` if no value is provided', () => {
      const highlight = getInitialHighlight(null, today, tz);
      const expectedDate = newUTC(
        2023,
        Month.December,
        UTCOffset < -1 ? 24 : 25,
        0,
      );
      expect(highlight).toEqual(expectedDate);
    });
  });
});
