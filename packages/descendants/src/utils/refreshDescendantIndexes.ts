import { DescendantsList } from '../Descendants.types';

/**
 * Returns a new descendants list with updated indexes.
 *
 * Call this after inserting/removing from the descendants list
 */
export const refreshDescendantIndexes = <T extends HTMLElement>(
  descendants: DescendantsList<T>,
): DescendantsList<T> => {
  return descendants.map((d, i) => ({ ...d, index: i }));
};
