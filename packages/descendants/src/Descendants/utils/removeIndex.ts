/**
 * Removes the given index from an array
 *
 * @internal
 */
// TODO: Move to `lib`
export function removeIndex<T extends any>(
  array: Array<T>,
  index: number,
): Array<T> {
  if (index == null || (array && !(index in array))) {
    return [...array];
  }

  const arrStart = array.slice(0, index);
  const arrEnd = array.slice(index + 1);

  return [...arrStart, ...arrEnd];
}
