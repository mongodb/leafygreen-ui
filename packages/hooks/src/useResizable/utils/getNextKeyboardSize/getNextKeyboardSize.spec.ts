import { KEYBOARD_RESIZE_PIXEL_STEP } from '../../useResizable.constants';
import { SizeGrowth } from '../../useResizable.types';

import { getNextKeyboardSize } from './getNextKeyboardSize';

describe('getNextKeyboardSize', () => {
  test('returns current size when sizeGrowth is undefined', () => {
    const result = getNextKeyboardSize({
      sizeGrowth: undefined,
      size: 250,
      maxSize: 500,
      minSize: 100,
    });

    expect(result).toBe(250);
  });

  test('increases size by KEYBOARD_RESIZE_PIXEL_STEP when sizeGrowth is Increase', () => {
    const result = getNextKeyboardSize({
      sizeGrowth: SizeGrowth.Increase,
      size: 250,
      maxSize: 500,
      minSize: 100,
    });

    expect(result).toBe(250 + KEYBOARD_RESIZE_PIXEL_STEP);
  });

  test('decreases size by KEYBOARD_RESIZE_PIXEL_STEP when sizeGrowth is Decrease', () => {
    const result = getNextKeyboardSize({
      sizeGrowth: SizeGrowth.Decrease,
      size: 250,
      maxSize: 500,
      minSize: 100,
    });

    // The implementation decreases by KEYBOARD_RESIZE_PIXEL_STEP (50)
    expect(result).toBe(250 - KEYBOARD_RESIZE_PIXEL_STEP);
  });

  test('respects maxSize constraint when increasing beyond maxSize', () => {
    const result = getNextKeyboardSize({
      sizeGrowth: SizeGrowth.Increase,
      size: 480,
      maxSize: 500,
      minSize: 100,
    });

    // Should cap at maxSize
    expect(result).toBe(500);
  });

  test('respects minSize constraint when decreasing below minSize', () => {
    const result = getNextKeyboardSize({
      sizeGrowth: SizeGrowth.Decrease,
      size: 120,
      maxSize: 500,
      minSize: 100,
    });

    // Should not go below minSize
    expect(result).toBe(100);
  });

  test('stays at minSize when already at minimum size and sizeGrowth is Decrease', () => {
    const result = getNextKeyboardSize({
      sizeGrowth: SizeGrowth.Decrease,
      size: 100,
      maxSize: 500,
      minSize: 100,
    });

    expect(result).toBe(100);
  });

  test('stays at maxSize when already at maximum size and sizeGrowth is Increase', () => {
    const result = getNextKeyboardSize({
      sizeGrowth: SizeGrowth.Increase,
      size: 500,
      maxSize: 500,
      minSize: 100,
    });

    expect(result).toBe(500);
  });
});
