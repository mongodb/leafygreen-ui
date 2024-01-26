import { Month } from '../constants';
import { newUTC } from '../newUTC';

import { getSimulatedUTCDate } from '.';

describe('packages/date-utils/getSimulatedUTCDate', () => {
  // TODO: Test in multiple time zones with properly mocked Date object
  test('Simulates a date in UTC', () => {
    // 2023-12-25
    const testDate = newUTC(2023, Month.December, 25, 0, 0);

    const sim = getSimulatedUTCDate(testDate);

    expect(sim?.toDateString()).toEqual('Mon Dec 25 2023');
  });
});
