import { KEYBOARD_RESIZE_PIXEL_STEP } from '../../useResizable.constants';
import { SizeGrowth } from '../../useResizable.types';

import { getNextKeyboardSize } from './getNextKeyboardSize';

// Mock DOM element with offsetWidth
const mockElement = {
  offsetWidth: 250,
  offsetHeight: 250,
} as HTMLElement;

describe('getNextKeyboardSize', () => {
  test('returns current size when sizeGrowth is undefined', () => {
    const result = getNextKeyboardSize({
      sizeGrowth: undefined,
      size: 250,
      maxSize: 500,
      minSize: 100,
      isVertical: true,
      currentElement: mockElement,
    });

    expect(result).toBe(250);
  });

  test('increases size by KEYBOARD_RESIZE_PIXEL_STEP when sizeGrowth is Increase', () => {
    const result = getNextKeyboardSize({
      sizeGrowth: SizeGrowth.Increase,
      size: 250,
      maxSize: 500,
      minSize: 100,
      isVertical: true,
      currentElement: mockElement,
    });

    expect(result).toBe(250 + KEYBOARD_RESIZE_PIXEL_STEP);
  });

  test('decreases size by KEYBOARD_RESIZE_PIXEL_STEP when sizeGrowth is Decrease', () => {
    const result = getNextKeyboardSize({
      sizeGrowth: SizeGrowth.Decrease,
      size: 250,
      maxSize: 500,
      minSize: 100,
      isVertical: true,
      currentElement: mockElement,
    });

    // The implementation decreases by KEYBOARD_RESIZE_PIXEL_STEP (50)
    expect(result).toBe(250 - KEYBOARD_RESIZE_PIXEL_STEP);
  });

  test('respects maxSize constraint when increasing beyond maxSize', () => {
    // Mock DOM element with offsetWidth
    const mockElement = {
      offsetWidth: 500,
      offsetHeight: 500,
    } as HTMLElement;

    const result = getNextKeyboardSize({
      sizeGrowth: SizeGrowth.Increase,
      size: 480,
      maxSize: 500,
      minSize: 100,
      isVertical: true,
      currentElement: mockElement,
    });

    // Should cap at maxSize
    expect(result).toBe(500);
  });

  test('respects minSize constraint when decreasing below minSize', () => {
    // Mock DOM element with offsetWidth
    const mockElement = {
      offsetWidth: 100,
      offsetHeight: 100,
    } as HTMLElement;

    const result = getNextKeyboardSize({
      sizeGrowth: SizeGrowth.Decrease,
      size: 100,
      maxSize: 500,
      minSize: 100,
      isVertical: true,
      currentElement: mockElement,
    });

    // Should not go below minSize
    expect(result).toBe(100);
  });

  test('decreases size of the element by KEYBOARD_RESIZE_PIXEL_STEP when the size of the element is smaller than the hook size', () => {
    // Mock DOM element with offsetWidth
    const mockElement = {
      offsetWidth: 400,
      offsetHeight: 400,
    } as HTMLElement;

    const result = getNextKeyboardSize({
      sizeGrowth: SizeGrowth.Decrease,
      size: 600, // Size is larger than element's offsetWidth
      maxSize: 500,
      minSize: 100,
      currentElement: mockElement,
      isVertical: true,
    });

    // Should use element's offsetWidth and decrease by KEYBOARD_RESIZE_PIXEL_STEP
    expect(result).toBe(400 - KEYBOARD_RESIZE_PIXEL_STEP);
  });

  test('handles null currentElement gracefully', () => {
    const result = getNextKeyboardSize({
      sizeGrowth: SizeGrowth.Decrease,
      size: 250,
      maxSize: 500,
      minSize: 100,
      currentElement: null,
      isVertical: true,
    });

    // Should just decrease by KEYBOARD_RESIZE_PIXEL_STEP from the current size
    expect(result).toBe(250 - KEYBOARD_RESIZE_PIXEL_STEP);
  });
});
