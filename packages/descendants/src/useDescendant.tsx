import { ForwardedRef, RefObject, useContext, useRef } from 'react';

import {
  useForwardedRef,
  useIsomorphicLayoutEffect,
} from '@leafygreen-ui/hooks';

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
  const { dispatch } = useContext(context);

  const index = useRef(-1);
  const id = useRef(genId());

  useIsomorphicLayoutEffect(() => {
    const _id = id.current;

    dispatch({
      type: 'register',
      currentIndex: index.current,
      id: _id,
      ref: ref,
      callback: (d: any) => {
        index.current = d.index;
      },
    });

    return () => {
      dispatch({
        type: 'remove',
        id: _id,
      });
    };
  }, [dispatch, ref]);

  // useIsomorphicLayoutEffect(() => {

  // }, [dispatch]);

  return {
    ref,
    index: index.current,
    id: id.current,
  };
};
