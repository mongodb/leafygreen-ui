import { rollover } from '.';

describe('packages/lib/helpers/rollover', () => {
  test('returns value when within bounds', () => {
    expect(rollover(5, 0, 10)).toEqual(5);
  });

  test('returns a rolled over value', () => {
    expect(rollover(11, 0, 10)).toEqual(1);
  });

  test('returns a rolled under value', () => {
    expect(rollover(-1, 0, 10)).toEqual(9);
  });

  test('returns a rolled over value when value is > 2x the range', () => {
    expect(rollover(21, 0, 10)).toEqual(1);
  });

  test('returns a rolled under value when value is > 2x the range', () => {
    expect(rollover(-11, 0, 10)).toEqual(9);
  });
});
