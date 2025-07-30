import { SizeGrowth } from '../../useResizable.types';

import { getNextSize } from './getNextSize';

describe('getNextSize', () => {
  const sortedKeyboardSizes = [100, 200, 300, 400, 500];

  test('returns current size when sizeGrowth is undefined', () => {
    const result = getNextSize({
      sizeGrowth: undefined,
      size: 250,
      sortedKeyboardSizes,
    });

    expect(result).toBe(250);
  });

  test('returns the next larger size when sizeGrowth is Increase', () => {
    const result = getNextSize({
      sizeGrowth: SizeGrowth.Increase,
      size: 250,
      sortedKeyboardSizes,
    });

    expect(result).toBe(300);
  });

  test('returns the next smaller size when sizeGrowth is Decrease', () => {
    const result = getNextSize({
      sizeGrowth: SizeGrowth.Decrease,
      size: 250,
      sortedKeyboardSizes,
    });

    expect(result).toBe(200);
  });

  test('returns undefined when already at maximum size and sizeGrowth is Increase', () => {
    const result = getNextSize({
      sizeGrowth: SizeGrowth.Increase,
      size: 500,
      sortedKeyboardSizes,
    });

    expect(result).toBe(500);
  });

  test('returns undefined when already at minimum size and sizeGrowth is Decrease', () => {
    const result = getNextSize({
      sizeGrowth: SizeGrowth.Decrease,
      size: 100,
      sortedKeyboardSizes,
    });

    expect(result).toBe(100);
  });

  test('returns next size when current size is not in the sortedKeyboardSizes array', () => {
    const increaseResult = getNextSize({
      sizeGrowth: SizeGrowth.Increase,
      size: 150, // Between 100 and 200
      sortedKeyboardSizes,
    });

    expect(increaseResult).toBe(200);

    const decreaseResult = getNextSize({
      sizeGrowth: SizeGrowth.Decrease,
      size: 150, // Between 100 and 200
      sortedKeyboardSizes,
    });

    expect(decreaseResult).toBe(100);
  });

  test('handles case when size is below all available sizes', () => {
    const result = getNextSize({
      sizeGrowth: SizeGrowth.Increase,
      size: 50, // Below the smallest size (100)
      sortedKeyboardSizes,
    });

    expect(result).toBe(100);
  });

  test('handles case when size is above all available sizes', () => {
    const result = getNextSize({
      sizeGrowth: SizeGrowth.Decrease,
      size: 600, // Above the largest size (500)
      sortedKeyboardSizes,
    });

    expect(result).toBe(500);
  });
});
