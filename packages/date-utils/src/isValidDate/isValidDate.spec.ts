import { DateType } from '../../dist';
import { mockTimeZone } from '../testing/mockTimeZone';

import {
  isDateObject,
  isInvalidDateObject,
  isValidDate,
  isValidDateString,
} from '.';

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

describe('packages/date-utils/isDateObject', () => {
  test('valid date', () => {
    expect(isDateObject(new Date())).toBe(true);
  });
  test('invalid date object', () => {
    expect(isDateObject(new Date('invalid'))).toBe(true);
  });
  test('null', () => {
    expect(isDateObject(null)).toBe(false);
  });
  test('undefined', () => {
    expect(isDateObject(undefined)).toBe(false);
  });
  test('string', () => {
    expect(isDateObject('string')).toBe(false);
  });
  test('number', () => {
    expect(isDateObject(5)).toBe(false);
  });
  test('empty object', () => {
    expect(isDateObject({})).toBe(false);
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

describe('packages/date-utils/isInvalidDateObject', () => {
  test('valid date', () => {
    expect(isInvalidDateObject(new Date())).toBe(false);
  });
  test('null', () => {
    expect(isInvalidDateObject(null)).toBe(false);
  });
  test('empty object', () => {
    expect(isInvalidDateObject({} as DateType)).toBe(false);
  });
  test('invalid Date', () => {
    expect(isInvalidDateObject(new Date('invalid'))).toBe(true);
  });
});
