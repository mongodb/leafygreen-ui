import { ComponentProps, ComponentType, PropsWithChildren } from 'react';

import { AsProp } from '../Polymorphic/Polymorphic.types';
import {
  InferredPolymorphicComponentType,
  PolymorphicAs,
  PolymorphicComponentType,
} from '..';

/**
 * A mock of the @types/node URLObject.
 * Used by libraries like NextJS
 * */
export interface NodeUrlLike {
  auth?: any;
  hash?: any;
  host?: any;
  hostname?: any;
  href?: string | null | undefined;
  pathname?: any;
  protocol?: any;
  search?: any;
  slashes?: any;
  port?: any;
  query?: any;
}

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

/**
 * Generates loosely typed polymorphic props, for use in tests or wrapper components,
 * or whenever using `PropsOf` may generate an excessively deep type
 *
 * e.g.
 * ```tsx
 * type MyBaseProps = {}
 * const MyComponent = Polymorphic<MyBaseProps>(() => {...})
 * type MyComponentProps = PropsOf<typeof MyComponent>
 * type LooseComponentProps = LoosePolymorphicProps<MyBaseProps>
 * ```
 */
export type LoosePolymorphicProps<XP = {}> = PropsWithChildren<
  XP & AsProp<PolymorphicAs>
> &
  // All attributes of any Intrinsic element
  Omit<Partial<JSX.IntrinsicElements[keyof JSX.IntrinsicElements]>, 'href'> & {
    href?: string | NodeUrlLike;
  };
