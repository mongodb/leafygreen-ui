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
 * Extends Polymorphic
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
 * Extends Polymorphic
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

type RestrictedType = 'a' | 'button' | React.ComponentType;

type RestrictedProps<T extends RestrictedType> = PolymorphicPropsWithRef<
  T,
  {
    title?: 'string';
  }
>;

export const RestrictedExample = <T extends RestrictedType = 'button'>({
  as,
  ...rest
}: RestrictedProps<T>) => {
  return <Polymorphic as={as as RestrictedType} {...rest} />;
};
