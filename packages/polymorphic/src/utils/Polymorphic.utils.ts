import { ComponentProps, ComponentType } from 'react';

import { InferredPolymorphicComponentType, PolymorphicComponentType } from '..';

/**
 * Computes the props of any Polymorphic component, or other React component.
 */
export type PropsOf<
  C extends
    | PolymorphicComponentType
    | InferredPolymorphicComponentType
    | ComponentType,
> = C extends
  | PolymorphicComponentType<infer P>
  | InferredPolymorphicComponentType<infer P>
  ? P
  : C extends ComponentType
  ? ComponentProps<C>
  : never;
