import { KEYBOARD_RESIZE_PIXEL_STEP } from '../../useResizable.constants';
import { SizeGrowth } from '../../useResizable.types';

/**
 * Returns the next size based on the current size and size growth direction.
 * @param sizeGrowth - The direction of size growth (increase or decrease).
 * @param size - The current size.
 * @returns The next size based on the growth direction, or the current size if no change is needed.
 */
export const getNextKeyboardSize = ({
  sizeGrowth,
  size,
  maxSize,
  minSize,
}: {
  sizeGrowth: SizeGrowth | undefined;
  size: number;
  maxSize: number;
  minSize: number;
}) => {
  if (!sizeGrowth) return size; // No change if sizeGrowth is undefined

  if (sizeGrowth === SizeGrowth.Increase) {
    // increase the size by the value but not exceeding maxSize
    return Math.min(size + KEYBOARD_RESIZE_PIXEL_STEP, maxSize);
  } else {
    // if (size > minSize) return minSize;
    // decrease the size by the value but not going below minSize
    return Math.max(size - KEYBOARD_RESIZE_PIXEL_STEP, minSize);
  }
};
