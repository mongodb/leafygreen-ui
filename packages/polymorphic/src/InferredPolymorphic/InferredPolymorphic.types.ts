import {
  ComponentType,
  PropsWithChildren,
  ReactElement,
  RefAttributes,
  WeakValidationMap,
} from 'react';

import {
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
 * Union of {@link AnchorLikeProps} and {@link InheritedProps}
 */
export type InheritedExplicitAnchorLikeProps<
  T extends AnchorLike | undefined,
  XP = {},
> = AnchorLikeProps<T, XP> &
  (T extends AnchorLike ? InheritedProps<T, XP> : {});

/**
 * A Discriminated Union, where:
 * - If `href` is provided to the component as a prop, (but `as` is not)
 * then we infer that the `as` prop is `a`, and inherit anchor props.
 * - Otherwise `href` is invalid, and we treat the `as` prop as the provided T
 */
export type InferredProps<T extends PolymorphicAs, XP = {}> = PropsWithChildren<
  (
    | ({
        href: string;
        as?: 'a';
      } & InheritedProps<'a', XP>)
    | ({
        href?: never;
        as?: T;
      } & InheritedProps<T, XP>)
  ) &
    XP
>;

/**
 * Inferred extension of {@link PolymorphicProps}
 *
 * If `T` is {@link AnchorLike}, (or undefined),
 *  - then we extend {@link InheritedExplicitAnchorLikeProps}
 *
 * Otherwise, (if T is anything else),
 * - we extend the {@link InferredProps} Discriminated Union
 *
 * Note: It's a known issue that passing a component with no props (`() => <></>`)
 * as the `as` prop will be improperly flagged as `AnchorLike`.
 * We have decided not to add additional type complexity to address this minor edge case.
 */
export type InferredPolymorphicProps<
  T extends PolymorphicAs,
  XP = {},
> = T extends AnchorLike | undefined
  ? InheritedExplicitAnchorLikeProps<T, XP>
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
