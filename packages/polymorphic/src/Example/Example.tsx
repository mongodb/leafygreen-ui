import React from 'react';
import {
  PolymorphicAs,
  Polymorph,
  Polymorphic,
  PolymorphicPropsWithRef,
  PolymorphicRef,
  usePolymorphic,
} from '..';

interface BaseExampleProps {
  /** An arbitrary title */
  title?: string;
  /** Flag for dark mode */
  darkMode?: boolean;
}

type ExampleProps<T extends PolymorphicAs> = PolymorphicPropsWithRef<
  T,
  BaseExampleProps
>;

/**
 * Extends Polymorphic
 * @test
 */
export const ExampleComponent = <T extends PolymorphicAs = 'div'>({
  as,
  title,
  ...rest
}: ExampleProps<T>) => {
  return (
    <Polymorph as={as as React.ElementType} {...rest}>
      {title}
    </Polymorph>
  );
};
ExampleComponent.displayName = 'ExampleComponent';

/**
 * Uses `usePolymorphic` hook
 */
export const ExampleWithFactory = Polymorphic<BaseExampleProps>(
  ({ as, title, ...rest }) => {
    const { Component, ref } = usePolymorphic(as, rest);
    return (
      <Component ref={ref} {...rest}>
        {title}
      </Component>
    );
  },
);
ExampleWithFactory.displayName = 'ExampleWithFactory';

/**
 * Extends Polymorphic
 * @test
 */
export const ExampleForwardRef = React.forwardRef(
  <T extends PolymorphicAs = 'div'>(
    { as, title, ...rest }: ExampleProps<T>,
    ref: PolymorphicRef<T>,
  ) => {
    return (
      <Polymorph as={as as React.ElementType} {...rest} ref={ref}>
        {title}
      </Polymorph>
    );
  },
);
ExampleForwardRef.displayName = 'ExampleForwardRef';

export const ExampleForwardRefWithFactory = Polymorphic<BaseExampleProps>(
  ({ as, title, ...rest }, ref) => {
    const { Component } = usePolymorphic(as, rest);
    return (
      <Component ref={ref} {...rest}>
        {title}
      </Component>
    );
  },
);
ExampleForwardRefWithFactory.displayName = 'ExampleForwardRefWithFactory';

/**
 * Ensure `as` types can be restricted
 */
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
  return <Polymorph as={as as RestrictedType} {...rest} />;
};
