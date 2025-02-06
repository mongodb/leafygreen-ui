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

  test('iso-8601 is valid', () => {
    expect(isValidLocale('iso-8601')).toBeTruthy();
  });

  test('iso8601 is _not_ valid', () => {
    console.error = jest.fn();
    expect(isValidLocale('iso8601')).toBeTruthy();
    expect(console.error).toHaveBeenCalled();
  });

  test('asdf is not valid', () => {
    console.error = jest.fn();
    expect(isValidLocale('asdf')).toBeFalsy();
    expect(console.error).toHaveBeenCalled();
  });

  test('undefined is not valid', () => {
    expect(isValidLocale(undefined)).toBeFalsy();
  });
});
