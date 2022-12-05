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

export function usePolymorphicComponent<T extends PolymorphicAs>(
  as?: T,
): React.ElementType {
  const Component = as || 'div';
  return Component;
}

export function usePolymorphic(as?: PolymorphicAs): {
  Component: PolymorphicAs;
  ref: PolymorphicRef<PolymorphicAs>;
} {
  const Component = usePolymorphicComponent(as);
  const ref = usePolymorphicRef(as);

  return {
    Component,
    ref,
  };
}
