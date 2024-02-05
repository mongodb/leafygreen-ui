import {
  ComponentProps,
  ForwardedRef,
  RefObject,
  useContext,
  useMemo,
} from 'react';

import {
  useForwardedRef,
  useIdAllocator,
  useIsomorphicLayoutEffect,
} from '@leafygreen-ui/hooks';

import { DescendantContextType } from './DescendantsContext';
import { findDescendantIndexWithId } from './utils';

interface UseDescendantReturnObject<T extends HTMLElement> {
  ref: RefObject<T>;
  index: number;
  id: string;
}

/**
 * Registers a component as a descendant of a given context, and calculates its index within the rendered descendant list.
 */
export const useDescendant = <T extends HTMLElement>(
  context: DescendantContextType<T>,
  fwdRef?: RefObject<T> | ForwardedRef<T>,
  props?: ComponentProps<any>,
): UseDescendantReturnObject<T> => {
  const ref: React.RefObject<T> = useForwardedRef(fwdRef ?? null, null);
  const { descendants, dispatch } = useContext(context);
  const id = useIdAllocator({ prefix: 'descendant' });

  // Find the element with this id in the descendants list
  const index = useMemo(() => {
    return findDescendantIndexWithId(descendants, id);
  }, [descendants, id]);

  // On render, register the element as a descendant
  useIsomorphicLayoutEffect(() => {
    const _id = id;

    // Register this component as a descendant
    dispatch({
      type: 'register',
      id: _id,
      ref,
    });

    // On un-mount/cleanup remove the element from the descendants list
    return () => {
      dispatch({
        type: 'remove',
        id: _id,
      });
    };
  }, [dispatch, id, ref]);

  // When the props change, update them in the descendants list so the parent has access.
  // We don't initially register the descendant with props,
  // so we don't have to remove & re-register it each time the props change
  useIsomorphicLayoutEffect(() => {
    dispatch({
      type: 'update',
      id: id,
      props,
    });
  }, [dispatch, id, props]);

  return {
    ref,
    index,
    id: id,
  };
};
