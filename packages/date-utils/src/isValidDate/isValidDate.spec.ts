import { mockTimeZone } from '../testing/mockTimeZone';

import { isValidDate, isValidDateString } from '.';

describe('packages/date-utils/isValidDate', () => {
  test('accepts Date objects', () => {
    expect(isValidDate(new Date())).toBe(true);
    expect(isValidDate(new Date(Date.UTC(2023, 1, 1)))).toBe(true);
  });

  test('accepts Date objects when the time zone is mocked', () => {
    mockTimeZone('America/Los_Angeles', -8);
    expect(isValidDate(new Date())).toBe(true);
    jest.resetAllMocks();
  });

  test('rejects invalid date objects', () => {
    expect(isValidDate(new Date('invalid'))).toBe(false);
    expect(isValidDate({} as Date)).toBe(false);
  });

  test('rejects undefined', () => {
    expect(isValidDate(undefined)).toBe(false);
  });
  test('rejects null', () => {
    expect(isValidDate(null)).toBe(false);
  });
});

describe('packages/date-utils/isValidDateString', () => {
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
