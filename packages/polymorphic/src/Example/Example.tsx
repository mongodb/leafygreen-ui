import React from 'react';
import {
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

type ExampleProps<T extends React.ElementType> = PolymorphicPropsWithRef<
  T,
  BaseExampleProps
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
    <Polymorph as={as as React.ElementType} {...rest}>
      {title}
    </Polymorph>
  );
};
ExampleComponent.displayName = 'ExampleComponent';

/**
 * Uses `usePolymorphic` hook
 */
export const ExampleWithHook = Polymorphic<BaseExampleProps>(
  ({ as, title, ...rest }) => {
    const { Component, ref } = usePolymorphic(as);
    return (
      <Component ref={ref} {...rest}>
        {title}
      </Component>
    );
  },
);
ExampleWithHook.displayName = 'ExampleWithHook';

/**
 * Extends Polymorphic
 * @test
 */
export const ExampleForwardRef = React.forwardRef(
  <T extends React.ElementType = 'div'>(
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

export const ExampleForwardRefWithHook = Polymorphic<BaseExampleProps>(
  ({ as, title, ...rest }, ref) => {
    const { Component } = usePolymorphic(as);
    return (
      <Component ref={ref} {...rest}>
        {title}
      </Component>
    );
  },
);
ExampleForwardRefWithHook.displayName = 'ExampleForwardRefWithHook';

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
