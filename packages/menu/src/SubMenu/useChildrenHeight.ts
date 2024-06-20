import { DependencyList, RefObject, useEffect, useState } from 'react';

/**
 * Calculates the cumulative height of an element's children
 */
export const useChildrenHeight = <T extends HTMLElement>(
  parentRef: RefObject<T>,
  // open: boolean,
  deps: DependencyList,
): number => {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    setHeight(calcChildrenHeight(parentRef));
  }, [parentRef, deps]);

  return height;
};

const calcChildrenHeight = <T extends HTMLElement>(
  parentRef: RefObject<T>,
): number => {
  if (!parentRef.current) return 0;

  const height = Array.from(parentRef.current.childNodes).reduce((h, child) => {
    const childHeight = (child as HTMLElement).clientHeight;
    h += childHeight;
    return h;
  }, 0);

  return height;
};
