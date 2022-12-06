import React from 'react';
import { usePolymorphic } from './Polymorphic.hooks';
import {
  PolymorphicAs,
  PolymorphicComponentType,
  PolymorphicPropsWithRef,
  PolymorphicRef,
} from './Polymorphic.types';

/**
 * Base polymorphic component
 */
export const BasePolymorph = <T extends PolymorphicAs = 'div'>(
  { as, children, ...rest }: PolymorphicPropsWithRef<T>,
  ref: PolymorphicRef<T>,
) => {
  const { Component } = usePolymorphic(as);

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
