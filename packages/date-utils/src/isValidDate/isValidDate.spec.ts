import { isValidDate, isValidDateString } from '.';

describe('packages/date-utils/isValidDate', () => {
  test('accepts Date objects', () => {
    expect(isValidDate(new Date())).toBe(true);
    expect(isValidDate(new Date(Date.UTC(2023, 1, 1)))).toBe(true);
  });

  test('accepts numbers', () => {
    expect(isValidDate(Date.now())).toBe(true);
    expect(isValidDate(0)).toBe(true);
  });

  test('accepts strings', () => {
    expect(isValidDate('1993-12-26')).toBe(true);
    expect(isValidDate('not a date')).toBe(false);
  });

  test('accepts null', () => {
    expect(isValidDate(null)).toBe(false);
  });

  describe('isValidDateString', () => {
    test('us format is valid', () => {
      expect(isValidDateString('12/26/1993')).toBeTruthy();
    });

    test('iso format is valid', () => {
      expect(isValidDateString('1993-12-26')).toBeTruthy();
    });

    test('undefined format is not valid', () => {
      expect(isValidDateString(undefined)).toBeFalsy();
    });
  });
});
