import React from 'react';
import {
  PolymorphicComponentType,
  PolymorphicPropsWithRef,
  PolymorphicRef,
} from './Polymorphic.types';

// eslint-disable-next-line react/display-name
export const Polymorphic = React.forwardRef(
  <T extends React.ElementType = 'div'>(
    { as, children, ...rest }: PolymorphicPropsWithRef<T>,
    ref: PolymorphicRef<T>,
  ) => {
    const Component = as || 'div';

    return (
      <Component {...rest} ref={ref}>
        {children}
      </Component>
    );
  },
) as PolymorphicComponentType;

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
