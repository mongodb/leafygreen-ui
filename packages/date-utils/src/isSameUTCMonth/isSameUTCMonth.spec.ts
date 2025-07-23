import { Month } from '../constants';
import { newTZDate } from '../newTZDate';
import { newUTC } from '../newUTC';
import { mockTimeZone } from '../testing/mockTimeZone';

import { isSameUTCMonth } from '.';

const TZOffset = -5;

describe('packages/date-utils/isSameUTCMonth', () => {
  beforeEach(() => {
    mockTimeZone('America/New_York', TZOffset);
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('when both dates are defined in UTC', () => {
    test('true', () => {
      const utc1 = newUTC(2023, Month.September, 1);
      const utc2 = newUTC(2023, Month.September, 10);
      expect(isSameUTCMonth(utc1, utc2)).toBe(true);
    });

    test('false', () => {
      const utc1 = newUTC(2023, Month.September, 1);
      const utc2 = newUTC(2023, Month.August, 31);
      expect(isSameUTCMonth(utc1, utc2)).toBe(false);
    });
  });

  describe('when one date is defined locally', () => {
    test('true', () => {
      const utc = newUTC(2023, Month.September, 10);
      const local = newTZDate(TZOffset, 2023, Month.August, 31, 21, 0, 0);
      expect(isSameUTCMonth(utc, local)).toBe(true);
    });

    test('false', () => {
      const utc = newUTC(2023, Month.September, 10);
      const local = newTZDate(TZOffset, 2023, Month.August, 31, 12, 0);
      expect(isSameUTCMonth(utc, local)).toBe(false);
    });
  });

  describe(' when both dates are defined locally', () => {
    test('true', () => {
      const local1 = newTZDate(TZOffset, 2023, Month.September, 1, 0, 0);
      const local2 = newTZDate(TZOffset, 2023, Month.September, 30, 18, 0);
      expect(isSameUTCMonth(local1, local2)).toBe(true);
    });

    test('false', () => {
      const local1 = newTZDate(TZOffset, 2023, Month.September, 1, 0, 0);
      const local2 = newTZDate(TZOffset, 2023, Month.September, 30, 20, 0);
      expect(isSameUTCMonth(local1, local2)).toBe(false);
    });
  });

  test('false: when one or both dates is null', () => {
    expect(isSameUTCMonth(new Date(), null)).toBe(false);
    expect(isSameUTCMonth(null, new Date())).toBe(false);
    expect(isSameUTCMonth(null, null)).toBe(false);
  });

  test('false for different years', () => {
    const utc1 = newUTC(2023, Month.September, 1);
    const utc2 = newUTC(2024, Month.September, 10);
    expect(isSameUTCMonth(utc1, utc2)).toBe(false);
  });

  test('returns false when one or both dates is invalid', () => {
    expect(isSameUTCMonth(new Date(), new Date('invalid'))).toBe(false);
    expect(isSameUTCMonth(new Date('invalid'), new Date())).toBe(false);
    expect(isSameUTCMonth(new Date('invalid'), new Date('invalid'))).toBe(
      false,
    );
  });
});
