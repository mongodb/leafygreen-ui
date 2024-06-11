import {
  ComponentType,
  PropsWithChildren,
  ReactElement,
  RefAttributes,
  WeakValidationMap,
} from 'react';

import {
  AsProp,
  InheritedProps,
  PolymorphicAs,
} from '../Polymorphic/Polymorphic.types';
import { NodeUrlLike } from '../utils/Polymorphic.utils';
import { PolymorphicRef } from '..';

/** Either an anchor tag, or a component that accepts an `href` */
export type AnchorLike =
  | 'a'
  | ComponentType<{ href: string }>
  | ComponentType<{ href: NodeUrlLike }>;

/**
 * Wrapping props in this type ensures that if `href` is defined,
 * the `as` type can only be `AnchorLike`, and all anchor props are accepted
 */
export type AnchorLikeProps<
  T extends AnchorLike | undefined,
  P = {},
> = PropsWithChildren<
  {
    href: string | NodeUrlLike;
    as?: T extends AnchorLike ? T : 'a';
  } & P
>;

/**
 * If `href` is provided to the component as a prop, but `as` is not
 * then we infer that the `as` prop is `a`, and inherit anchor props.
 * Otherwise `href` is invalid, and we treat the `as` prop as usual
 */
export type InferredProps<T extends PolymorphicAs, XP = {}> = PropsWithChildren<
  XP &
    (
      | ({ href: string; as?: 'a' } & InheritedProps<'a', XP>)
      | (({ href?: never } & AsProp<T>) & InheritedProps<T, XP>)
    )
>;

/**
 * Inferred extension of {@link PolymorphicProps}
 *
 * If `T` is an anchor, (or undefined),
 *  - then we explicitly add a required `href` prop
 *  - and extend the Inherited Props of T,
 *  Additionally, if `T` is undefined,
 *    - then we explicitly set as = 'a'
 *
 * Otherwise, (if T is anything else)
 *  and if href is defined in the provided props
 *    - we force `as` to be 'a',
 *    - add a required `href` prop
 *    - inherit all anchor props
 *  otherwise (if href is not defined)
 *  - href is `never`
 *  - `as` prop is extended as T
 *  - inherit all props from T
 *
 * Note: It's a known issue that passing a component with no props (`() => <></>`)
 * as the `as` prop will be improperly flagged as `AnchorLike`.
 * We have decided not to add additional type complexity to address this minor edge case.
 */
export type InferredPolymorphicProps<
  T extends PolymorphicAs,
  XP = {},
> = T extends AnchorLike | undefined
  ? AnchorLikeProps<T, XP> & InheritedProps<T, XP>
  : InferredProps<T, XP>;

/**
 * Inferred props clone of {@link PolymorphicPropsWithRef}
 */
export type InferredPolymorphicPropsWithRef<
  T extends PolymorphicAs,
  XP = {},
> = InferredPolymorphicProps<T, XP> & {
  /** The ref object returned by `React.useRef` */
  ref?: PolymorphicRef<T>;
};

/**
 * Inferred props clone of {@link PolymorphicComponentType}
 */
export interface InferredPolymorphicComponentType<
  XP = {},
  DefaultAs extends PolymorphicAs = PolymorphicAs,
> {
  <T extends PolymorphicAs = DefaultAs>(
    props: InferredPolymorphicPropsWithRef<T, XP>,
    ref: PolymorphicRef<T>,
  ): ReactElement | null;
  displayName?: string;
  propTypes?:
    | WeakValidationMap<
        InferredPolymorphicProps<PolymorphicAs, XP> & RefAttributes<any>
      >
    | undefined;
}

/**
 * Inferred Props clone of {@link PolymorphicRenderFunction}
 */
export interface InferredPolymorphicRenderFunction<
  XP = {},
  DefaultAs extends PolymorphicAs = PolymorphicAs,
> {
  <T extends PolymorphicAs = DefaultAs>(
    props: InferredPolymorphicPropsWithRef<T, XP>,
    ref: PolymorphicRef<T>,
  ): ReactElement | null;
  displayName?: string;
  propTypes?: never;
}
