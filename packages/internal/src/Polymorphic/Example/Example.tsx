import React from 'react';
import {
  Polymorphic,
  PolymorphicPropsWithRef,
  PolymorphicRef,
  usePolymorphic,
} from '..';
import { PolymorphicComponent } from '../Polymorphic';

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
    <Polymorphic as={as as React.ElementType} {...rest}>
      {title}
    </Polymorphic>
  );
};
ExampleComponent.displayName = 'ExampleComponent';

/**
 * Uses `usePolymorphic` hook
 */
export const ExampleWithHook = PolymorphicComponent<BaseExampleProps>(
  ({ as, title, ...rest }) => {
    const { Component, ref } = usePolymorphic(as);
    return (
      <Component as={as} ref={ref} {...rest}>
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
      <Polymorphic as={as as React.ElementType} {...rest} ref={ref}>
        {title}
      </Polymorphic>
    );
  },
);
ExampleForwardRef.displayName = 'ExampleForwardRef';

export const ExampleForwardRefWithHook = PolymorphicComponent<BaseExampleProps>(
  ({ as, title, ...rest }, ref) => {
    const { Component } = usePolymorphic(as);
    return (
      <Component as={as} ref={ref} {...rest}>
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
  return <Polymorphic as={as as RestrictedType} {...rest} />;
};
