/**
 * Based on https://blog.logrocket.com/build-strongly-typed-polymorphic-components-react-typescript/
 */

import React from 'react';

/** An interface that defines the `as` prop */
interface AsProp<T extends React.ElementType> {
  as?: T;
}

/** The basic props for the Polymorphic component */
export type PolymorphicProps<
  T extends React.ElementType,
  P = {},
> = React.PropsWithChildren<P & AsProp<T>> & React.ComponentPropsWithoutRef<T>;

/** The type of the Ref element */
export type PolymorphicRef<T extends React.ElementType> =
  React.ComponentPropsWithRef<T>['ref'];

/** Add the `ref` prop type to PolymorphicProps */
export type PolymorphicPropsWithRef<
  T extends React.ElementType,
  P = {},
> = PolymorphicProps<T, P> & { ref?: PolymorphicRef<T> };

// type PolymorphicComponentType = <T extends React.ElementType = 'div'>(
//   props: PolymorphicPropsWithRef<T>,
// ) => React.ElementType | null;

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
);

Polymorphic.displayName = 'Polymorphic';
