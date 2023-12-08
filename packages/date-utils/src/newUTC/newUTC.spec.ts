import { newUTC } from '.';

describe('packages/date-utils/newUTC', () => {
  test('creates a new UTC date', () => {
    const date = newUTC(2023, 11, 5);
    expect(date.getUTCDate()).toEqual(5);
    expect(date.getUTCMonth()).toEqual(11);
    expect(date.getUTCFullYear()).toEqual(2023);
  });

  test('creates a new UTC date with time', () => {
    const date = newUTC(2023, 11, 5, 12);
    expect(date.getUTCHours()).toEqual(12);
  });
});
