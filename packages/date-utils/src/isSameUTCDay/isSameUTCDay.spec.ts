import { newTZDate } from '../newTZDate';
import { newUTC } from '../newUTC';
import { mockTimeZone } from '../testing/mockTimeZone';

import { isSameUTCDay } from '.';

const americaNewYorkTimeZone = 'America/New_York';

describe('packages/date-utils/isSameUTCDay', () => {
  beforeEach(() => {
    mockTimeZone(americaNewYorkTimeZone, -4); // EDT is UTC-4 (4 hours behind UTC) in September
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('when both dates are defined in UTC', () => {
    test('returns true when both dates are equal', () => {
      const utc1 = newUTC(2023, 8, 1, 0, 0, 0);
      const utc2 = newUTC(2023, 8, 1, 21, 0, 0);
      expect(isSameUTCDay(utc1, utc2)).toBe(true);
    });

    test('returns false when both dates are not equal', () => {
      const utc1 = newUTC(2023, 8, 1, 0, 0, 0);
      const utc2 = newUTC(2023, 8, 2, 0, 0, 0);
      expect(isSameUTCDay(utc1, utc2)).toBe(false);
    });
  });

  describe('when one date is defined locally', () => {
    test('returns true when both dates are the same day in UTC', () => {
      const utc = newUTC(2023, 8, 10, 0, 0, 0); // September 10, 2023 00:00 UTC

      // September 9, 2023 21:00 EDT => September 10, 2023 01:00 UTC
      const local = newTZDate({
        timeZone: americaNewYorkTimeZone,
        year: 2023,
        month: 8,
        date: 9,
        hours: 21,
        minutes: 0,
      });

      expect(isSameUTCDay(utc, local)).toBe(true);
    });

    test('returns false when both dates are not the same day in UTC', () => {
      const utc = newUTC(2023, 8, 10); // September 10, 2023 00:00 UTC

      // September 9, 2023 12:00 EDT => September 9, 2023 16:00 UTC
      const local = newTZDate({
        timeZone: americaNewYorkTimeZone,
        year: 2023,
        month: 8,
        date: 9,
        hours: 12,
        minutes: 0,
      });

      expect(isSameUTCDay(utc, local)).toBe(false);
    });
  });

  describe('when both dates are defined locally', () => {
    test('returns true when both dates are the same day in UTC', () => {
      // September 8, 2023 20:00 EDT => September 9, 2023 00:00 UTC
      const local1 = newTZDate({
        timeZone: americaNewYorkTimeZone,
        year: 2023,
        month: 8,
        date: 8,
        hours: 20,
        minutes: 0,
      });

      // September 9, 2023 18:00 EDT => September 9, 2023 22:00 UTC
      const local2 = newTZDate({
        timeZone: americaNewYorkTimeZone,
        year: 2023,
        month: 8,
        date: 9,
        hours: 18,
        minutes: 0,
      });
      expect(isSameUTCDay(local1, local2)).toBe(true);
    });

    test('returns false when both dates are not the same day in UTC', () => {
      // September 9, 2023 00:00 EDT => September 9, 2023 04:00 UTC
      const local1 = newTZDate({
        timeZone: americaNewYorkTimeZone,
        year: 2023,
        month: 8,
        date: 9,
        hours: 0,
        minutes: 0,
      });

      // September 9, 2023 20:00 EDT => September 10, 2023 00:00 UTC
      const local2 = newTZDate({
        timeZone: americaNewYorkTimeZone,
        year: 2023,
        month: 8,
        date: 9,
        hours: 20,
        minutes: 0,
      });

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
