import React from 'react';
import { consoleOnce } from '@leafygreen-ui/lib';
import { usePolymorphicComponent } from './Polymorphic.hooks';
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
export const Polymorphic: PolymorphicComponentType =
  React.forwardRef(BasePolymorphic);
Polymorphic.displayName = 'Polymorphic';

/** Returns a polymorphic component */
export const PolymorphicComponent = <P extends object = {}>(
  render: PolymorphicComponentType<P>,
): PolymorphicComponentType<P> => {
  if (render.length === 1) {
    consoleOnce.error(
      `Warning: PolymorphicComponent render functions require two parameters: props and ref. If you don't need to forward a ref, pass _ as the second argument of \`PolymorphicComponent\` callback`,
    );
  }

  const polyComponent = React.forwardRef(render);
  polyComponent.displayName = render.displayName;
  return polyComponent;
};
