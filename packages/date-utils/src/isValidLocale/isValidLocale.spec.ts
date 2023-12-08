import { isValidLocale } from '.';

describe('packages/date-utils/isValidLocale', () => {
  test('en-US is valid', () => {
    expect(isValidLocale('en-US')).toBeTruthy();
  });

  test('en-UK is valid', () => {
    expect(isValidLocale('en-UK')).toBeTruthy();
  });

  test('de is valid', () => {
    expect(isValidLocale('de')).toBeTruthy();
  });

  test('asdf is not valid', () => {
    expect(isValidLocale('asdf')).toBeFalsy();
  });

  test('undefined is not valid', () => {
    expect(isValidLocale(undefined)).toBeFalsy();
  });
});
