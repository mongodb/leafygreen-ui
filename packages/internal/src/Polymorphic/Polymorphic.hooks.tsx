import React from 'react';

/**
 * A wrapper around `React.useRef`
 * that provides an accurately typed Ref object
 */
export const usePolymorphicRef = <
  E extends keyof HTMLElementTagNameMap & React.ElementType,
>() => {
  return React.useRef<
    | (E extends keyof HTMLElementTagNameMap
        ? HTMLElementTagNameMap[E]
        : unknown)
    | null
  >(null);
};
