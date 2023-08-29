import { isValidDate } from './isValidDate';

describe('packages/date-picker/utils/isValidDate', () => {
  test('us format is valid', () => {
    expect(isValidDate('12/26/1993')).toBeTruthy();
  });

  test('iso format is valid', () => {
    expect(isValidDate('1993-12-26')).toBeTruthy();
  });

  test('undefined format is not valid', () => {
    expect(isValidDate(undefined)).toBeFalsy();
  });
});
