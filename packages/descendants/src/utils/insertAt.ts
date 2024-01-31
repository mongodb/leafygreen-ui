/**
 * Copy an array of items with a new item added at a specific index.
 * @param array The source array
 * @param item The item to insert into the array
 * @param index The index to insert the item at
 * @returns A copy of the array with the item inserted at the specified index
 */
export function insertAt<T extends any>(
  array: Array<T>,
  item: T,
  index?: number,
): Array<T> {
  if (index == null || !(index in array)) {
    return [...array, item];
  }

  const arrStart = array.slice(0, index);
  const arrEnd = array.slice(index);

  return [...arrStart, item, ...arrEnd];
}
