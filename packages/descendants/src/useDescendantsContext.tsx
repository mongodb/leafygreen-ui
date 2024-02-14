import { useContext } from 'react';

import { DescendantContextType } from './DescendantsContext';

/**
 * Returns the Descendants data structure from the provided context object
 */
export const useDescendantsContext = <T extends HTMLElement>(
  context: DescendantContextType<T>,
) => {
  const { descendants } = useContext(context);
  return { descendants };
};
