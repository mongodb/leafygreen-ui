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
 * A hook that computes & returns the polymorphic ReactElement based on the `as` prop
 *
 * For client-side components, prefer using `usePolymorphic`, which returns a typed `ref` as well as the polymorphic component
 */
export function usePolymorphicComponent<T extends PolymorphicAs>(
  as?: T,
): PolymorphicAs {
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
  const Component = usePolymorphicComponent(as);
  const ref = usePolymorphicRef(as);

  return {
    Component,
    ref,
  };
}
