import { HTMLElementProps } from '@leafygreen-ui/lib';
import React from 'react';
import { Polymorphic, PolymorphicPropsWithRef, PolymorphicRef } from '..';

interface ControlProps extends HTMLElementProps<'div'> {
  /** An arbitrary title */
  title?: string;

  /** Flag for dark mode */
  darkMode?: boolean;
}

/**
 * A control component that should always output TSDoc
 *
 * @test
 *
 * */
export const ControlTestComponent = ({ children, ...rest }: ControlProps) => (
  <div {...rest}>{children}</div>
);

/**
 * A control component using forwardRef that should always output TSDoc
 *
 * @test
 *
 * */
export const ControlForwardRef = React.forwardRef<HTMLDivElement, ControlProps>(
  (
    { children, ...rest }: ControlProps,
    ref: React.ForwardedRef<HTMLDivElement>,
  ) => (
    <div {...rest} ref={ref}>
      {children}
    </div>
  ),
);
ControlForwardRef.displayName = 'ControlForwardRef';

type HOCProps<T extends React.ElementType> = PolymorphicPropsWithRef<
  T,
  {
    /** An arbitrary title */
    title?: string;

    /** Flag for dark mode */
    darkMode?: boolean;
  }
>;

/**
 * HigherOrderTestComponent
 *
 * Extends Polymorphic
 *
 * @test
 *
 */
export const HigherOrderTestComponent = <T extends React.ElementType = 'div'>({
  as,
  title,
  ...rest
}: HOCProps<T>) => {
  return (
    <Polymorphic as={as as React.ElementType} {...rest}>
      {title}
    </Polymorphic>
  );
};

/**
 * HigherOrderTestComponentForwardRef.
 *
 * Extends Polymorphic
 *
 * @test
 *
 */
export const HigherOrderTestComponentForwardRef = React.forwardRef(
  <T extends React.ElementType = 'div'>(
    { as, title, ...rest }: HOCProps<T>,
    ref: PolymorphicRef<T>,
  ) => {
    return (
      <Polymorphic as={as as React.ElementType} {...rest} ref={ref}>
        {title}
      </Polymorphic>
    );
  },
);

HigherOrderTestComponentForwardRef.displayName =
  'HigherOrderTestComponentForwardRef';
