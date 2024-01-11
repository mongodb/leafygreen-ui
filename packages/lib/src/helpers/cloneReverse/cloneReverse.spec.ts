import { cloneReverse } from '.';

describe('packages/date-picker/utils/cloneReverse', () => {
  test('reverses the array', () => {
    const arr = ['a', 'b', 'c', 'd'];
    expect(cloneReverse(arr)).toEqual(['d', 'c', 'b', 'a']);
  });

  test('does not affect the original array', () => {
    const arr = ['a', 'b', 'c', 'd'];
    const _ = cloneReverse(arr);
    expect(arr).toEqual(['a', 'b', 'c', 'd']);
  });

  test('returns undefined for invalid input', () => {
    expect(cloneReverse()).toBeUndefined();
  });
});
