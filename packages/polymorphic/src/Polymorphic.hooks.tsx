import React from 'react';
import { PolymorphicRef } from './Polymorphic.types';

/**
 * A wrapper around `React.useRef`
 * that provides an accurately typed Ref object
 */
export const usePolymorphicRef = <E extends React.ElementType>() => {
  return React.useRef<
    | (E extends keyof HTMLElementTagNameMap
        ? HTMLElementTagNameMap[E]
        : unknown)
    | null
  >(null);
};

export function usePolymorphicComponent<T extends React.ElementType>(
  as?: T,
): React.ElementType {
  const Component = as || 'div';
  return Component;
}

export function usePolymorphic<T extends React.ElementType>(
  as?: T,
  props?: { [key: string]: any },
): {
  Component: React.ElementType;
  ref: PolymorphicRef<T>;
} {
  if (typeof props?.href === 'string') {
    as = 'a';
  }

  const Component = usePolymorphicComponent(as);

  const ref = usePolymorphicRef<T>();
  return {
    Component,
    ref,
  };
}
