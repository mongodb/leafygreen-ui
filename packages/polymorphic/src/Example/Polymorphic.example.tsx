import React from 'react';
import styled from '@emotion/styled';

import {
  InferredPolymorphic,
  Polymorph,
  Polymorphic,
  PolymorphicAs,
  type PolymorphicComponentType,
  type PolymorphicPropsWithRef,
  type PolymorphicRef,
  useInferredPolymorphic,
  usePolymorphic,
} from '..';

interface ExampleProps {
  /** An arbitrary title */
  title?: string;
  /** Flag for dark mode */
  darkMode?: boolean;
}

/**
 * Uses `usePolymorphic` hook
 */

export const ExamplePolymorphic = Polymorphic<ExampleProps>(
  ({ as, title, ...rest }) => {
    const { Component, ref } = usePolymorphic(as);
    return (
      <Component ref={ref} {...rest}>
        {title}
      </Component>
    );
  },
  'ExamplePolymorphic',
);

export const ExamplePolymorphicWithRef = Polymorphic<ExampleProps>(
  ({ as, title, ...rest }, ref) => {
    const { Component } = usePolymorphic(as);
    return (
      <Component ref={ref} {...rest}>
        {title}
      </Component>
    );
  },
  'ExamplePolymorphicWithRef',
);

export const ExampleInferred = InferredPolymorphic<ExampleProps>(
  ({ as, title, ...rest }) => {
    const { Component, ref } = useInferredPolymorphic(as, rest);
    return (
      <Component ref={ref} {...rest}>
        {title}
      </Component>
    );
  },
  'ExampleInferred',
);

export const ExampleInferredDefaultButton = InferredPolymorphic<
  ExampleProps,
  'button'
>(({ as = 'button' as PolymorphicAs, title, ...rest }) => {
  const { Component, ref } = useInferredPolymorphic(as, rest);
  return (
    <Component ref={ref} {...rest}>
      {title}
    </Component>
  );
}, 'ExampleInferredDefaultButton');

/**
 * Advanced usage, not recommended
 */
type AdvancedProps<T extends PolymorphicAs> = PolymorphicPropsWithRef<
  T,
  ExampleProps
>;
/**
 * Extends Polymorphic
 * @test
 */
export const AdvancedPolymorphic = <T extends PolymorphicAs = 'div'>({
  as,
  title,
  ...rest
}: AdvancedProps<T>) => {
  return (
    <Polymorph as={as as React.ElementType} {...rest}>
      {title}
    </Polymorph>
  );
};
AdvancedPolymorphic.displayName = 'AdvancedPolymorphic';

/**
 * Extends Polymorphic
 * @test
 */
export const AdvancedPolymorphicWithRef = React.forwardRef(
  <T extends PolymorphicAs = 'div'>(
    { as, title, ...rest }: AdvancedProps<T>,
    ref: PolymorphicRef<T>,
  ) => {
    return (
      <Polymorph as={as as React.ElementType} {...rest} ref={ref}>
        {title}
      </Polymorph>
    );
  },
);
AdvancedPolymorphicWithRef.displayName = 'AdvancedPolymorphicWithRef';

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

/**
 *
 * @test
 */
export const RestrictedExample = <T extends RestrictedType = 'button'>({
  as,
  ...rest
}: RestrictedProps<T>) => {
  return <Polymorph as={as as RestrictedType} {...rest} />;
};

/**
 * Styled version of ExampleComponent
 * @test
 */
export const StyledExample = styled(ExamplePolymorphic)`
  color: hotpink;
` as PolymorphicComponentType;
