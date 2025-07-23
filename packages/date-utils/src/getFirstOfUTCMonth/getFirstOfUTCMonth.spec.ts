import { getFirstOfUTCMonth } from '.';

describe('packages/date-utils/getFirstOfUTCMonth', () => {
  test('returns the first day of the provided month', () => {
    expect(getFirstOfUTCMonth(new Date(Date.UTC(2023, 0, 31)))).toEqual(
      new Date(Date.UTC(2023, 0, 1)),
    );
  });

  test('returns the same day if provided the 1st', () => {
    expect(getFirstOfUTCMonth(new Date(Date.UTC(2023, 11, 1)))).toEqual(
      new Date(Date.UTC(2023, 11, 1)),
    );
  });

  test('returned time is midnight', () => {
    const first = getFirstOfUTCMonth(new Date(Date.UTC(2023, 11, 1)));
    expect(first.getUTCHours()).toEqual(0);
    expect(first.getUTCMinutes()).toEqual(0);
    expect(first.getUTCSeconds()).toEqual(0);
    expect(first.getUTCMilliseconds()).toEqual(0);
  });
});
