import { isSameUTCDayAndTime } from './isSameUTCDayAndTime';

describe('packages/time-input/utils/isSameUTCDayAndTime', () => {
  test('returns true if the two dates are the same day and time in UTC', () => {
    const date1 = new Date('2025-01-01T12:00:00Z');
    const date2 = new Date('2025-01-01T12:00:00Z');
    expect(isSameUTCDayAndTime(date1, date2)).toBe(true);
  });

  test('returns false if the two dates are not the same day in UTC', () => {
    const date1 = new Date('2025-01-01T12:00:00Z');
    const date2 = new Date('2025-01-02T12:00:00Z');
    expect(isSameUTCDayAndTime(date1, date2)).toBe(false);
  });

  test('returns false if the two dates are not the same time in UTC', () => {
    const date1 = new Date('2025-01-01T12:00:00Z');
    const date2 = new Date('2025-01-01T12:00:01Z');
    expect(isSameUTCDayAndTime(date1, date2)).toBe(false);
  });

  test('returns false if the two dates are not the same date and time in UTC', () => {
    const date1 = new Date('2025-02-01T12:00:00Z');
    const date2 = new Date('2025-01-01T12:00:01Z');
    expect(isSameUTCDayAndTime(date1, date2)).toBe(false);
  });

  test('returns false when one or both dates is null', () => {
    expect(isSameUTCDayAndTime(new Date(), null)).toBe(false);
    expect(isSameUTCDayAndTime(null, new Date())).toBe(false);
    expect(isSameUTCDayAndTime(null, null)).toBe(false);
  });

  test('returns false when one or both dates is invalid', () => {
    expect(isSameUTCDayAndTime(new Date(), new Date('invalid'))).toBe(false);
    expect(isSameUTCDayAndTime(new Date('invalid'), new Date())).toBe(false);
    expect(isSameUTCDayAndTime(new Date('invalid'), new Date('invalid'))).toBe(
      false,
    );
  });
});
