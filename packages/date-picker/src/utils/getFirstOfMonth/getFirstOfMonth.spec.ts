import { getFirstOfMonth } from '.';

describe('packages/date-picker/utils/getFirstOfMonth', () => {
  test('returns the first day of the provided month', () => {
    expect(getFirstOfMonth(new Date(Date.UTC(2023, 0, 31)))).toEqual(
      new Date(Date.UTC(2023, 0, 1)),
    );
  });

  test('returns the same day if provided the 1st', () => {
    expect(getFirstOfMonth(new Date(Date.UTC(2023, 11, 1)))).toEqual(
      new Date(Date.UTC(2023, 11, 1)),
    );
  });
});
