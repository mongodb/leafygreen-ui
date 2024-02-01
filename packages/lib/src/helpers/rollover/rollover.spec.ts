import { rollover } from '.';

describe('packages/lib/helpers/rollover', () => {
  test('returns value when within bounds', () => {
    expect(rollover(5, 1, 12)).toEqual(5);
  });

  test('returns a rolled over value', () => {
    expect(rollover(13, 1, 12)).toEqual(1);
  });

  test('returns a rolled under value', () => {
    expect(rollover(0, 1, 12)).toEqual(12);
  });

  test('returns a rolled over value when value is > 2x the range', () => {
    expect(rollover(25, 1, 12)).toEqual(2);
  });

  test('returns a rolled under value when value is > 2x the range', () => {
    expect(rollover(-12, 1, 12)).toEqual(11);
  });
});
