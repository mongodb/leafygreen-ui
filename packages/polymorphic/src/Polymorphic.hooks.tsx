import React from 'react';

import { PolymorphicAs, PolymorphicRef } from './Polymorphic.types';

/**
 * A wrapper around `React.useRef`
 * that provides an accurately typed Ref object
 */
export const usePolymorphicRef = <E extends PolymorphicAs>(_?: E) => {
  // By accepting a prop with a generic type, we can type this function using JS-domain vars
  return React.useRef<
    | (E extends keyof HTMLElementTagNameMap
        ? HTMLElementTagNameMap[E]
        : unknown)
    | null
  >(null);
};

export function getPolymorphicComponent<T extends PolymorphicAs>(
  as?: T,
): React.ElementType {
  return as || 'div';
}

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
