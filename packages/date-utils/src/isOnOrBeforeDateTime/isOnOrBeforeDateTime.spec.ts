import { Month } from '../constants';
import { newUTC } from '../newUTC';

import { isOnOrBeforeDateTime } from './isOnOrBeforeDateTime';

describe('packages/date-utils/isOnOrBeforeDateTime', () => {
  const janA = newUTC(2026, Month.January, 17, 12, 0, 0, 0);
  const janB = newUTC(2026, Month.January, 17, 12, 1, 0, 0);
  const feb = newUTC(2026, Month.February, 20, 12, 0, 0, 0);

  test('returns true when the date1 is on date2', () => {
    expect(isOnOrBeforeDateTime(janA, janA)).toBe(true);
  });

  test('returns true when the date1 is before date2', () => {
    expect(isOnOrBeforeDateTime(janA, janB)).toBe(true);
  });

  test('returns false when the date1 is after date2', () => {
    expect(isOnOrBeforeDateTime(janB, janA)).toBe(false);
    expect(isOnOrBeforeDateTime(feb, janB)).toBe(false);
  });

  test('returns false when one or both dates is invalid', () => {
    expect(isOnOrBeforeDateTime(new Date(), new Date('invalid'))).toBe(false);
    expect(isOnOrBeforeDateTime(new Date('invalid'), new Date())).toBe(false);
    expect(isOnOrBeforeDateTime(new Date('invalid'), new Date('invalid'))).toBe(
      false,
    );
  });
});
