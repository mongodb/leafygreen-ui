import { useContext } from 'react';

import {
  useForceRerender,
  useIsomorphicLayoutEffect,
} from '@leafygreen-ui/hooks';

import { DescendantContextType } from '../context/DescendantsContext';
import { Descendant } from '../Descendants.types';

interface UseDescendantReturnObject<T> {
  // ref: RefObject<T>;
  index: number;
}

/**
 * Registers a component as a descendant of a given context, and calculates its index within the rendered descendant list.
 */
export const useDescendant = <T extends HTMLElement>(
  // fwdRef: RefObject<T> | ForwardedRef<T>,
  descendant: Partial<Descendant<T>>,
  context: DescendantContextType<T>,
): UseDescendantReturnObject<T> => {
  // const ref = useForwardedRef(fwdRef, null);

  const rerender = useForceRerender();

  const { descendants, registerDescendant } = useContext(context);

  const index = descendants.findIndex(
    item => item.element === descendant.element,
  );

  // When the list of descendants changes
  useIsomorphicLayoutEffect(() => {
    // If Ref has not been set, force a rerender so it is set
    if (!descendant.element) {
      rerender();
    }

    const cleanup = registerDescendant(descendant.element);

    return () => {
      console.log('Cleanup', { descendant });
      cleanup();
    };
  }, [descendant, descendants, registerDescendant, rerender]);

  return {
    // ref,
    index,
  };
};
