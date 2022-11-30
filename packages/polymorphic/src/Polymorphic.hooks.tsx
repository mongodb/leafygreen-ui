import React from 'react';

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

export const usePolymorphicComponent = (
  as?: React.ElementType,
): React.ElementType => {
  const Component = as || 'div';
  return Component;
};

export const usePolymorphic = <T extends React.ElementType>(as?: T) => {
  const Component = usePolymorphicComponent(as);
  const ref = usePolymorphicRef<T>();
  return {
    Component,
    ref,
  };
};
