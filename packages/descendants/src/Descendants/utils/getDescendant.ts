import { Descendant, DescendantsList } from '../Descendants.types';

/**
 * Returns the Descendant with the provided `id`, or undefined
 */
export const getDescendantById = (
  id: string,
  descendants: DescendantsList,
): Descendant | undefined => {
  return descendants.find(d => d.id === id);
};

/**
 * Returns the Descendant at the provided `index`, or undefined
 */
export const getDescendantByIndex = (
  index: number,
  descendants: DescendantsList,
): Descendant | undefined => {
  return descendants[index];
};
