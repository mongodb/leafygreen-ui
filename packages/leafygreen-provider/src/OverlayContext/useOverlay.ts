import { ForwardedRef, RefObject, useMemo } from 'react';

import {
  useForwardedRef,
  useIdAllocator,
  useIsomorphicLayoutEffect,
} from '@leafygreen-ui/hooks';

import { useOverlayContext } from './OverlayContext';

/**
 * Registers a component as an overlay in the {@link OverlayContext} on mount.
 * Removes the overlay component on unmount. Checks if `isTopMostOverlay`
 */
export const useOverlay = <T extends HTMLElement>(
  fwdRef: RefObject<T> | ForwardedRef<T>,
) => {
  const ref: RefObject<T> = useForwardedRef(fwdRef, null);
  const { topMostOverlay, registerOverlay, removeOverlay } =
    useOverlayContext();
  const id = useIdAllocator({ prefix: 'overlay' });

  useIsomorphicLayoutEffect(() => {
    const refAttached = ref.current !== null;
    const refExists = document.contains(ref.current);

    if (refAttached && refExists) {
      registerOverlay({
        element: ref.current,
        id,
        ref,
      });
    }

    return () => {
      removeOverlay(id);
    };
  }, [ref.current]);

  const isTopMostOverlay = useMemo(() => {
    return topMostOverlay ? topMostOverlay.id === id : false;
  }, [topMostOverlay]);

  return {
    id,
    isTopMostOverlay,
    ref,
  };
};
