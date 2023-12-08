import { getDaysInUTCMonth } from '.';

describe('packages/date-utils/getDaysInUTCMonth', () => {
  test('returns the number of days in the month', () => {
    const result = getDaysInUTCMonth(new Date(2100, 1 /* Feb */, 11));
    expect(result).toEqual(28);
  });

  test('when given the 1st of the month', () => {
    const result = getDaysInUTCMonth(new Date(2100, 1 /* Feb */, 1));
    expect(result).toEqual(28);
  });

  test('when given the last of the month', () => {
    const result = getDaysInUTCMonth(new Date(2100, 1 /* Feb */, 28));
    expect(result).toEqual(28);
  });

  test('when given February of a leap year', () => {
    const result = getDaysInUTCMonth(new Date(2000, 1 /* Feb */, 1));
    expect(result).toEqual(29);
  });

  test('handles dates before 100 AD', () => {
    const date = new Date(0);
    date.setFullYear(0, 1 /* Feb */, 15);
    date.setHours(0, 0, 0, 0);
    const result = getDaysInUTCMonth(date);
    expect(result).toEqual(29);
  });

  test('returns NaN if the given date is invalid', () => {
    const result = getDaysInUTCMonth(new Date(NaN));
    expect(result).toBeNaN();
  });
});
