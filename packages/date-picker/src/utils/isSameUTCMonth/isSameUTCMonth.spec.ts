import tzMock from 'timezone-mock';

import { Month } from '../../constants';

import { isSameUTCMonth } from '.';

describe('packages/date-picker/utils/isSameUTCMonth', () => {
  beforeAll(() => {
    tzMock.register('US/Eastern');
  });

  beforeEach(() => {
    jest
      .useFakeTimers()
      .setSystemTime(new Date(Date.UTC(2023, Month.September, 1, 0, 0, 0)));
  });

  test('true, when both defined in UTC', () => {
    const utc1 = new Date(Date.UTC(2023, Month.September, 1));
    const utc2 = new Date(Date.UTC(2023, Month.September, 10));
    expect(isSameUTCMonth(utc1, utc2)).toBe(true);
  });

  test('false: when both dates are defined in UTC', () => {
    const utc1 = new Date(Date.UTC(2023, Month.September, 1));
    const utc2 = new Date(Date.UTC(2023, Month.August, 31));
    expect(isSameUTCMonth(utc1, utc2)).toBe(false);
  });

  test('true: when one date is defined locally', () => {
    const utc = new Date(Date.UTC(2023, Month.September, 10));
    const local = new Date('2023-08-31T21:00:00');
    expect(isSameUTCMonth(utc, local)).toBe(true);
  });

  test('false: when one date is defined locally', () => {
    const utc = new Date(Date.UTC(2023, Month.September, 10));
    const local = new Date('2023-08-31T12:00');
    expect(isSameUTCMonth(utc, local)).toBe(false);
  });

  test('true: when both dates are defined locally', () => {
    const local1 = new Date('2023-09-01T00:00');
    const local2 = new Date('2023-09-30T19:00');
    expect(isSameUTCMonth(local1, local2)).toBe(true);
  });

  test('false: when both dates are defined locally', () => {
    const local1 = new Date('2023-09-01T00:00');
    const local2 = new Date('2023-09-30T20:00');
    expect(isSameUTCMonth(local1, local2)).toBe(false);
  });

  test('false: when one or both dates is null', () => {
    expect(isSameUTCMonth(new Date(), null)).toBe(false);
    expect(isSameUTCMonth(null, new Date())).toBe(false);
    expect(isSameUTCMonth(null, null)).toBe(false);
  });
});
