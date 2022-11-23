import React from 'react';
import { Polymorphic, PolymorphicPropsWithRef, PolymorphicRef } from '..';

type ExampleProps<T extends React.ElementType> = PolymorphicPropsWithRef<
  T,
  {
    /** An arbitrary title */
    title?: string;

    /** Flag for dark mode */
    darkMode?: boolean;
  }
>;

/**
 * ExampleComponent
 * Extends Polymorphic
 *
 * @test
 */
export const ExampleComponent = <T extends React.ElementType = 'div'>({
  as,
  title,
  ...rest
}: ExampleProps<T>) => {
  return (
    <Polymorphic as={as as React.ElementType} {...rest}>
      {title}
    </Polymorphic>
  );
};

/**
 * ExampleComponentForwardRef.
 * Extends Polymorphic
 *
 * @test
 */
export const ExampleComponentForwardRef = React.forwardRef(
  <T extends React.ElementType = 'div'>(
    { as, title, ...rest }: ExampleProps<T>,
    ref: PolymorphicRef<T>,
  ) => {
    return (
      <Polymorphic as={as as React.ElementType} {...rest} ref={ref}>
        {title}
      </Polymorphic>
    );
  },
);
ExampleComponentForwardRef.displayName = 'ExampleComponentForwardRef';
