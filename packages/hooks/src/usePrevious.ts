import { useEffect, useRef } from 'react';

/**
 * Hook to store previous props
 * https://reactjs.org/docs/hooks-faq.html#how-to-get-the-previous-props-or-state
 */
export default function usePrevious<T>(value: T): T | undefined {
  // @ts-expect-error REACT 19
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
}
