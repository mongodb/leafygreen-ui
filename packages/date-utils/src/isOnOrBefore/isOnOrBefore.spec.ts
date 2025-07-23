import { Month } from '../constants';
import { newUTC } from '../newUTC';

import { isOnOrBefore } from '.';

describe('packages/date-utils/isOnOrBefore', () => {
  const jan = newUTC(2023, Month.January, 1);
  const jul = newUTC(2023, Month.July, 5);
  const dec = newUTC(2023, Month.December, 26);

  test('d1 is before d2', () => {
    expect(isOnOrBefore(jan, jul)).toBe(true);
  });

  test('d1 is same as d2', () => {
    expect(isOnOrBefore(jul, jul)).toBe(true);
  });

  test('d1 is after as d2', () => {
    expect(isOnOrBefore(dec, jul)).toBe(false);
  });

  test('returns false when one or both dates is invalid', () => {
    expect(isOnOrBefore(new Date(), new Date('invalid'))).toBe(false);
    expect(isOnOrBefore(new Date('invalid'), new Date())).toBe(false);
    expect(isOnOrBefore(new Date('invalid'), new Date('invalid'))).toBe(false);
  });
});
