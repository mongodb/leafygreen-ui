import React from 'react';
import { usePolymorphicComponent } from './Polymorphic.hooks';
import {
  PolymorphicComponentType,
  PolymorphicPropsWithRef,
  PolymorphicRef,
} from './Polymorphic.types';

/**
 * Base polymorphic component
 */
export const BasePolymorph = <T extends React.ElementType = 'div'>(
  { as, children, ...rest }: PolymorphicPropsWithRef<T>,
  ref: PolymorphicRef<T>,
) => {
  const Component = usePolymorphicComponent(as);

  return (
    <Component {...rest} ref={ref}>
      {children}
    </Component>
  );
};

/**
 * Polymorphic component that supports forwarded refs
 *
 * With the `as` prop, Polymorphic can dynamically render
 * as any HTML element or React Component.
 */
export const Polymorph: PolymorphicComponentType =
  React.forwardRef(BasePolymorph);
Polymorph.displayName = 'Polymorph';
