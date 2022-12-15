import React from 'react';

import { PolymorphicAs, PolymorphicRef } from './Polymorphic.types';

/**
 * A wrapper around `React.useRef`
 * that provides an accurately typed Ref object
 */
export const usePolymorphicRef = <E extends PolymorphicAs>(_?: E) => {
  // By accepting a prop with a generic type, we can set the type E using JS vars.
  // i.e. instead of calling `usePolymorphicRef<'div'>()`
  // we can instead call `usePolymorphicRef('div')`

  return React.useRef<
    | (E extends keyof HTMLElementTagNameMap
        ? HTMLElementTagNameMap[E]
        : unknown)
    | null
  >(null);
};

/**
 * Internal utility to convert the generic `PolymorphicAs` prop
 * to a ReactElement
 */
function getPolymorphicComponent<T extends PolymorphicAs>(
  as?: T,
): React.ElementType {
  return as || 'div';
}

/**
 * A hook that returns an accurately typed polymorphic `Component` and `ref`,
 * given an `as` prop
 */
export function usePolymorphic<T extends PolymorphicAs>(
  as?: T,
): {
  Component: PolymorphicAs;
  ref: PolymorphicRef<T>;
} {
  const Component = getPolymorphicComponent(as);
  const ref = usePolymorphicRef(as);

  return {
    Component,
    ref,
  };
}
