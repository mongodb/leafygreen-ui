import { isSameUTCDay } from '.';

describe('packages/date-picker/utils/isSameUTCDay', () => {
  test('true: when both dates are defined in UTC', () => {
    const utc1 = new Date(Date.UTC(2023, 8, 1));
    const utc2 = new Date(Date.UTC(2023, 8, 1, 21, 0, 0));
    expect(isSameUTCDay(utc1, utc2)).toBe(true);
  });

  test('false: when both dates are defined in UTC', () => {
    const utc1 = new Date(Date.UTC(2023, 8, 1));
    const utc2 = new Date(Date.UTC(2023, 8, 2));
    expect(isSameUTCDay(utc1, utc2)).toBe(false);
  });

  test('true: when one date is defined locally', () => {
    const utc = new Date(Date.UTC(2023, 8, 10));
    const local = new Date('2023-09-09T21:00');
    expect(isSameUTCDay(utc, local)).toBe(true);
  });

  test('false: when one date is defined locally', () => {
    const utc = new Date(Date.UTC(2023, 8, 10));
    const local = new Date('2023-09-09T12:00');
    expect(isSameUTCDay(utc, local)).toBe(false);
  });

  test('true: when both dates are defined locally', () => {
    const local1 = new Date('2023-09-09T00:00');
    const local2 = new Date('2023-09-09T19:00');
    expect(isSameUTCDay(local1, local2)).toBe(true);
  });

  test('false: when both dates are defined locally', () => {
    const local1 = new Date('2023-09-09T00:00');
    const local2 = new Date('2023-09-09T20:00');
    expect(isSameUTCDay(local1, local2)).toBe(false);
  });

  test('false: when one or both dates is null', () => {
    expect(isSameUTCDay(new Date(), null)).toBe(false);
    expect(isSameUTCDay(null, new Date())).toBe(false);
    expect(isSameUTCDay(null, null)).toBe(false);
  });
});
