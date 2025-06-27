import { useEffect, useRef } from 'react';

/**
 * Returns whether this is the first render of a component.
 *
 * Additionally, calls the provided callback function _only_ on first render
 */
export const useFirstRender = (effect?: () => void): boolean => {
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      effect?.();
    }
  }, [effect]);

  return isFirstRender.current;
};
