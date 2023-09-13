import { isValidDateString } from '.';

describe('packages/date-picker/utils/isValidDateString', () => {
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
