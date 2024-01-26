import { Month } from '../constants';
import { newUTC } from '../newUTC';

import { isOnOrAfter } from '.';

describe('packages/date-utils/isOnOrAfter', () => {
  const jan = newUTC(2023, Month.January, 1);
  const jul = newUTC(2023, Month.July, 5);
  const dec = newUTC(2023, Month.December, 26);

  test('d1 is after as d2', () => {
    expect(isOnOrAfter(dec, jul)).toBe(true);
  });

  test('d1 is same as d2', () => {
    expect(isOnOrAfter(jul, jul)).toBe(true);
  });

  test('d1 is before d2', () => {
    expect(isOnOrAfter(jan, jul)).toBe(false);
  });

  test('returns false when one or both dates is invalid', () => {
    expect(isOnOrAfter(new Date(), new Date('invalid'))).toBe(false);
    expect(isOnOrAfter(new Date('invalid'), new Date())).toBe(false);
    expect(isOnOrAfter(new Date('invalid'), new Date('invalid'))).toBe(false);
  });
});
