import { KEYBOARD_RESIZE_PIXEL_STEP } from '../../useResizable.constants';
import { SizeGrowth } from '../../useResizable.types';

/**
 * Returns the next size based on the current size and size growth direction.
 * @param sizeGrowth - The direction of size growth (increase or decrease).
 * @param size - The current size.
 * @param maxSize - The maximum size allowed.
 * @param minSize - The minimum size allowed.
 * @param currentElement - The current element being resized, used to check its size constraints.
 * @param isVertical - Whether the resizing is vertical or horizontal.
 * @returns The next size based on the growth direction, or the current size if no change is needed.
 */
export const getNextKeyboardSize = ({
  sizeGrowth,
  size,
  maxSize,
  minSize,
  currentElement,
  isVertical,
}: {
  sizeGrowth: SizeGrowth | undefined;
  size: number;
  maxSize: number;
  minSize: number;
  currentElement: HTMLElement | null;
  isVertical: boolean;
}) => {
  if (!sizeGrowth) return size; // No change if sizeGrowth is undefined

  const currentElementSize = isVertical
    ? currentElement?.offsetWidth
    : currentElement?.offsetHeight;

  if (sizeGrowth === SizeGrowth.Increase) {
    // if the current element size is greater than the maxSize, return maxSize
    if (currentElement && currentElementSize && currentElementSize > maxSize)
      return maxSize;

    // increase the size by the value but not exceeding maxSize
    return Math.min(size + KEYBOARD_RESIZE_PIXEL_STEP, maxSize);
  } else {
    if (currentElement && currentElementSize) {
      // If the current element size is less than the minSize, return minSize
      if (currentElementSize < minSize) return minSize;

      // If the element has a max-width/max-height set in CSS, the hook size might exceed the max size in CSS. This ensures that the value is decreased using the implicit CSS max width/height and not the hook size.
      // This also ensures that if the element is resized to a size smaller than the minSize in the browser, it will not be resized further down.
      if (size > currentElementSize) {
        return Math.max(
          minSize,
          currentElementSize - KEYBOARD_RESIZE_PIXEL_STEP,
        );
      }
    }

    // decrease the size by the value but not going below minSize
    return Math.max(size - KEYBOARD_RESIZE_PIXEL_STEP, minSize);
  }
};
