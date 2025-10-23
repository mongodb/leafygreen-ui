import { useRef } from 'react';
import isEqual from 'lodash/isEqual';

/**
 * Deeply compares the current `object` parameter to the previously stored value,
 * and updates the stored ref if it has changed.
 * Returns the `current` ref element.
 *
 * Useful when using a constructed object as a dependency in a `useEffect` etc.
 * to avoid triggering when the object reference changes.
 *
 * @example
 * ```tsx
 * // obj is recreated on every render
 * const obj = { foo: true }
 *
 * // `objDep` is the same on each render (if values are not changed)
 * const objDep = useObjectDependency(obj);
 *
 * useEffect(() => {
 *  // only runs when the values of obj actually change
 * }, [objDep]);
 * ```
 */
export default function useObjectDependency<T>(object: T): T {
  const ref = useRef<T>();

  // we need isEqual for deep object comparison
  if (ref.current === undefined || !isEqual(ref.current, object)) {
    ref.current = object;
  }

  return ref.current;
}
