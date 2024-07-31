import { Descendant, DescendantsList } from '../Descendants.types';

/**
 * Returns the Descendant with the provided `id`, or undefined
 */
export const getDescendantById = <T extends HTMLElement>(
  id: string,
  descendants: DescendantsList<T>,
): Descendant<T> | undefined => {
  return descendants.find(d => d.id === id);
};

/**
 * Returns the Descendant at the provided `index`, or undefined
 */
export const getDescendantByIndex = <T extends HTMLElement>(
  index: number,
  descendants: DescendantsList<T>,
): Descendant<T> | undefined => {
  return descendants[index];
};
