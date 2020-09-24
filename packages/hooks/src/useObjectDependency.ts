import { useRef } from 'react';
import isEqual from 'lodash/isEqual';

export default function useObjectDependency<T>(object: T): T {
  const ref = useRef<T>();

  // we need isEqual for deep object comparison
  if (ref.current === undefined || !isEqual(ref.current, object)) {
    ref.current = object;
  }

  return ref.current;
}
