import React from 'react';
import {
  PolymorphicComponentType,
  PolymorphicPropsWithRef,
  PolymorphicRef,
} from './Polymorphic.types';

/**
 * Base polymorphic component
 */
export const BasePolymorphic = <T extends React.ElementType = 'div'>(
  { as, children, ...rest }: PolymorphicPropsWithRef<T>,
  ref: PolymorphicRef<T>,
) => {
  const Component = as || 'div';

  return (
    <Component {...rest} ref={ref}>
      {children}
    </Component>
  );
};

/**
 * Polymorphic component wrapped in a forward ref
 *
 * With the `as` prop, Polymorphic can dynamically render
 * as any HTML element or React Component.
 */
export const Polymorphic: PolymorphicComponentType =
  React.forwardRef(BasePolymorphic);
Polymorphic.displayName = 'Polymorphic';
