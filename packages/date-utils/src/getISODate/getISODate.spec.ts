import { Month } from '../constants';
import { newUTC } from '../newUTC';

import { getISODate } from '.';

describe('packages/date-utils/getISODate', () => {
  test('returns an ISO Date string', () => {
    const d1 = newUTC(2023, Month.July, 10);
    expect(getISODate(d1)).toEqual('2023-07-10');

    const d2 = new Date('2023-11-15T02:00:00.000Z');
    expect(getISODate(d2)).toEqual('2023-11-15');
  });
});
