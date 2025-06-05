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
 *
 * If the logic defining the `as` prop is defined internally within your component,
 * use this standalone `Polymorph` component.
 *
 * However: If you want to expose `as` as a prop of your component,
 * prefer the `{@link Polymorphic}` factory function and related hooks.
 */
export const Polymorph: PolymorphicComponentType =
  React.forwardRef(BasePolymorph);
Polymorph.displayName = 'Polymorph';
