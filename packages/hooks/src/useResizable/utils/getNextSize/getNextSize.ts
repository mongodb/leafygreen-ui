import { SizeGrowth } from '../../useResizable.types';

/**
 * Returns the next size based on the current size and size growth direction.
 * @param sizeGrowth - The direction of size growth (increase or decrease).
 * @param size - The current size.
 * @param sortedKeyboardSizes - An array of available sizes sorted in ascending order.
 * @returns The next size based on the growth direction, or the current size if no change is needed.
 */
export const getNextSize = ({
  sizeGrowth,
  size,
  sortedKeyboardSizes,
}: {
  sizeGrowth: SizeGrowth | undefined;
  size: number;
  sortedKeyboardSizes: Array<number>;
}) => {
  const currentSize = size;
  const sizes = sortedKeyboardSizes;

  if (!sizeGrowth) return currentSize; // No change if sizeGrowth is undefined

  if (sizeGrowth === SizeGrowth.Increase) {
    const size = sizes.find(size => size > currentSize);
    return size ?? currentSize;
  } else {
    const size = [...sizes].reverse().find(size => size < currentSize);
    return size ?? currentSize;
  }
};
