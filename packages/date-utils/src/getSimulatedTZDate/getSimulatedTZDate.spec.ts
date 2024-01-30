import padStart from 'lodash/padStart';

import { Month } from '../constants';
import { newUTC } from '../newUTC';
import { testTimeZones } from '../testing/testValues';

import { getSimulatedTZDate } from './getSimulatedTZDate';

describe('packages/date-utils/getSimulatedTZDate', () => {
  test.each(testTimeZones)('Simulates a date in $tz', ({ tz, UTCOffset }) => {
    // 2023-12-25
    const testDate = newUTC(2023, Month.December, 25, 0, 0);

    const sim = getSimulatedTZDate(testDate, tz);

    const TZDay = UTCOffset < 0 ? '24' : '25';
    const TZHr =
      UTCOffset < 0
        ? String(24 + UTCOffset)
        : padStart(String(UTCOffset), 2, '0');

    const expectedISOString = '2023-12-' + TZDay + 'T' + TZHr + ':00:00.000Z';
    expect(sim?.toISOString()).toEqual(expectedISOString);
  });
});
