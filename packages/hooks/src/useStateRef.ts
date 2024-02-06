import { useCallback, useRef, useState } from 'react';

/**
 *
 * A combination of useState and useRef,
 * returns the current state, a `setState` and a `getState` function.
 *
 * Use the `getState` function inside an event listener callbacks
 * in order to avoid referencing a stale state
 *
 * @param initial
 * @returns [state, setState, getState]
 */
export function useStateRef<T extends any>(
  initial: T,
): [T, (x: T) => void, () => T] {
  const [state, _setState] = useState<T>(initial);
  const ref = useRef<T>(state);

  const setState = useCallback(
    (newVal: T): void => {
      _setState(newVal);
      ref.current = newVal;
    },
    [_setState],
  );

  const getState = useCallback((): T => {
    return ref.current;
  }, []);

  return [state, setState, getState];
}
