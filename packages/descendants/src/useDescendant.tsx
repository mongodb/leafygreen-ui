import { ForwardedRef, RefObject, useContext, useMemo, useRef } from 'react';

import {
  useForwardedRef,
  useIsomorphicLayoutEffect,
} from '@leafygreen-ui/hooks';

import { findDescendantIndexWithId } from './utils/findDescendantWithId';
import { DescendantContextType } from './DescendantsContext';

/** @deprecated */
const genId = () => `_${Math.random().toString(36).substr(2, 9)}`;

interface UseDescendantReturnObject<T> {
  ref: RefObject<T>;
  index: number;
  id: string;
}

/**
 * Registers a component as a descendant of a given context, and calculates its index within the rendered descendant list.
 */
export const useDescendant = <T extends HTMLElement>(
  context: DescendantContextType<T>,
  fwdRef: RefObject<T> | ForwardedRef<T>,
): UseDescendantReturnObject<T> => {
  const ref: React.RefObject<T> = useForwardedRef(fwdRef, null);
  const { descendants, dispatch } = useContext(context);
  const id = useRef(genId());

  // Find the element with this id in the descendants list
  const index = useMemo(() => {
    return findDescendantIndexWithId(descendants, id.current);
  }, [descendants]);

  // On render, register the element as a descendant
  useIsomorphicLayoutEffect(() => {
    const _id = id.current;

    dispatch({
      type: 'register',
      id: _id,
      ref: ref,
    });

    // On un-mount/cleanup remove the element from the descendants list
    return () => {
      dispatch({
        type: 'remove',
        id: _id,
      });
    };
  }, [dispatch, ref]);

  return {
    ref,
    index: index,
    id: id.current,
  };
};
