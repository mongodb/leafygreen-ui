import { keyMap } from '@leafygreen-ui/lib';
import { useRef, useEffect } from 'react';

export const onKeyDown = (e: React.KeyboardEvent) => {
  // Stops default browser behavior from automatically scrolling the component
  if ([keyMap.ArrowUp, keyMap.ArrowDown].includes(e.keyCode)) {
    e.preventDefault();
  }
};

/**
 * Hook to store previous props
 * https://reactjs.org/docs/hooks-faq.html#how-to-get-the-previous-props-or-state
 */
export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
}
