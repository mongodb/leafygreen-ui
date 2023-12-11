import tzMock from 'timezone-mock';

import { Month } from '../constants';

import { isSameUTCMonth } from '.';

describe('packages/date-utils/isSameUTCMonth', () => {
  beforeEach(() => {
    tzMock.register('US/Eastern');
  });

  describe('when both dates are defined in UTC', () => {
    test('true', () => {
      const utc1 = new Date(Date.UTC(2023, Month.September, 1));
      const utc2 = new Date(Date.UTC(2023, Month.September, 10));
      expect(isSameUTCMonth(utc1, utc2)).toBe(true);
    });

    test('false', () => {
      const utc1 = new Date(Date.UTC(2023, Month.September, 1));
      const utc2 = new Date(Date.UTC(2023, Month.August, 31));
      expect(isSameUTCMonth(utc1, utc2)).toBe(false);
    });
  });

  describe('when one date is defined locally', () => {
    test('true', () => {
      const utc = new Date(Date.UTC(2023, Month.September, 10));
      const local = new Date('2023-08-31T21:00:00');
      expect(isSameUTCMonth(utc, local)).toBe(true);
    });

    test('false', () => {
      const utc = new Date(Date.UTC(2023, Month.September, 10));
      const local = new Date('2023-08-31T12:00');
      expect(isSameUTCMonth(utc, local)).toBe(false);
    });
  });

  describe(' when both dates are defined locally', () => {
    test('true', () => {
      const local1 = new Date('2023-09-01T00:00');
      const local2 = new Date('2023-09-30T19:00');
      expect(isSameUTCMonth(local1, local2)).toBe(true);
    });

    test('false', () => {
      const local1 = new Date('2023-09-01T00:00');
      const local2 = new Date('2023-09-30T20:00');
      expect(isSameUTCMonth(local1, local2)).toBe(false);
    });
  });

  test('false: when one or both dates is null', () => {
    expect(isSameUTCMonth(new Date(), null)).toBe(false);
    expect(isSameUTCMonth(null, new Date())).toBe(false);
    expect(isSameUTCMonth(null, null)).toBe(false);
  });

  test('false for different years', () => {
    const utc1 = new Date(Date.UTC(2023, Month.September, 1));
    const utc2 = new Date(Date.UTC(2024, Month.September, 10));
    expect(isSameUTCMonth(utc1, utc2)).toBe(false);
  });
});
