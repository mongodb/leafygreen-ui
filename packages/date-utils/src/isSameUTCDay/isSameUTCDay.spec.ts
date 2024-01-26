import { newTZDate } from '../newTZDate';
import { newUTC } from '../newUTC';
import { mockTimeZone } from '../testing/mockTimeZone';

import { isSameUTCDay } from '.';

const TZOffset = -5;

describe('packages/date-utils/isSameUTCDay', () => {
  beforeEach(() => {
    mockTimeZone('America/New_York', -5);
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('when both dates are defined in UTC', () => {
    test('returns true', () => {
      const utc1 = newUTC(2023, 8, 1, 0, 0, 0);
      const utc2 = newUTC(2023, 8, 1, 21, 0, 0);
      expect(isSameUTCDay(utc1, utc2)).toBe(true);
    });

    test('returns false', () => {
      const utc1 = newUTC(2023, 8, 1, 0, 0, 0);
      const utc2 = newUTC(2023, 8, 2, 0, 0, 0);
      expect(isSameUTCDay(utc1, utc2)).toBe(false);
    });
  });

  describe('when one date is defined locally', () => {
    test('returns true ', () => {
      const utc = newUTC(2023, 8, 10, 0, 0, 0);
      // '2023-09-09T21:00:00' NY time
      const local = newTZDate(TZOffset, 2023, 8, 9, 21, 0); //2023-09-10 02:00:00 UTC

      expect(isSameUTCDay(utc, local)).toBe(true);
    });

    test('returns false', () => {
      const utc = newUTC(2023, 8, 10);
      // '2023-09-09T12:00' NY time
      const local = newTZDate(TZOffset, 2023, 8, 9, 12, 0); //2023-09-09 17:00:00 UTC
      expect(isSameUTCDay(utc, local)).toBe(false);
    });
  });

  describe('when both dates are defined locally', () => {
    test('returns true', () => {
      const local1 = newTZDate(TZOffset, 2023, 8, 8, 20, 0); // 02:00 UTC + 1day
      const local2 = newTZDate(TZOffset, 2023, 8, 9, 18, 0); // 23:00 UTC
      expect(isSameUTCDay(local1, local2)).toBe(true);
    });

    test('returns false', () => {
      const local1 = newTZDate(TZOffset, 2023, 8, 9, 0, 0); // 05:00 UTC
      const local2 = newTZDate(TZOffset, 2023, 8, 9, 20, 0); // 02:00 UTC +1 day
      expect(isSameUTCDay(local1, local2)).toBe(false);
    });
  });

  test('returns false when one or both dates is null', () => {
    expect(isSameUTCDay(new Date(), null)).toBe(false);
    expect(isSameUTCDay(null, new Date())).toBe(false);
    expect(isSameUTCDay(null, null)).toBe(false);
  });

  test('returns false when one or both dates is invalid', () => {
    expect(isSameUTCDay(new Date(), new Date('invalid'))).toBe(false);
    expect(isSameUTCDay(new Date('invalid'), new Date())).toBe(false);
    expect(isSameUTCDay(new Date('invalid'), new Date('invalid'))).toBe(false);
  });
});
