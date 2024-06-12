import {
  ComponentPropsWithoutRef,
  ComponentType,
  PropsWithChildren,
  ReactElement,
  RefAttributes,
  WeakValidationMap,
} from 'react';

import { Optional } from '@leafygreen-ui/lib';

import {
  InheritedProps,
  PolymorphicAs,
} from '../Polymorphic/Polymorphic.types';
import { NodeUrlLike } from '../utils/Polymorphic.utils';
import { PolymorphicRef } from '..';

export type HrefLike = string | NodeUrlLike;

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
/* export type InferredPolymorphicProps<
  T extends PolymorphicAs,
  XP = {},
> = T extends AnchorLike | undefined
  ? InheritedExplicitAnchorLikeProps<T, XP>
  : InferredProps<T, XP>; */

/** Given some props object `P`, extracts the `as` prop, or returns the default `D` */
export type ExtractInferredAsProp<
  P extends {},
  D extends PolymorphicAs = PolymorphicAs,
> = P extends {
  as: infer T;
}
  ? T
  : P extends { href: infer H }
  ? H extends HrefLike
    ? 'a'
    : never
  : D;

/**
 * Given some props object `P` (that may include an `as` prop)
 * determine the remaining props based on the inferred `as` prop
 */
export type InferredPolymorphicProps<P extends {}> = P extends {
  as: infer T extends PolymorphicAs;
}
  ? T extends 'a' // If `as` is defined...
    ? InheritedExplicitAnchorLikeProps<T, P> // and `as` is AnchorLike, return explicit AnchorLike props
    : ComponentPropsWithoutRef<T> // else, `as` is anything other than AnchorLike, return that `as` prop's props //
  : P extends {
      href: infer H;
    }
  ? H extends HrefLike // If `as` is NOT  defined, but `href` is defined
    ? AnchorLikeProps<'a', P> // when `href` is valid, return AnchorLike props
    : never // `href` must be HrefLike
  : P; // Neither `as` nor `href` are defined; return the props we're given

/**
 * Inferred props clone of {@link PolymorphicPropsWithRef}
 */
export type InferredPolymorphicPropsWithRef<
  P extends {},
  D extends PolymorphicAs = PolymorphicAs,
> = InferredPolymorphicProps<P> & {
  /** The ref object returned by `React.useRef` */
  ref?: PolymorphicRef<ExtractInferredAsProp<P, D>>;
};

/**
 * Inferred Props clone of {@link PolymorphicRenderFunction}
 */
export interface InferredPolymorphicRenderFunction<
  XP = {},
  D extends PolymorphicAs = PolymorphicAs,
> {
  <P extends {}>(
    props: InferredPolymorphicProps<P>,
    ref: PolymorphicRef<ExtractInferredAsProp<P, D>>,
  ): ReactElement | null;
  displayName?: string;
  propTypes?: never;
}

/**
 * Inferred props clone of {@link PolymorphicComponentType}
 */
export type InferredPolymorphicComponentType<
  XP = {},
  D extends PolymorphicAs = PolymorphicAs,
> = InferredPolymorphicRenderFunction<XP, D> & {
  // FIXME: propTypes will be broken for any inherited props
  propTypes?:
    | WeakValidationMap<
        InferredPolymorphicProps<{ as: any } & XP> & RefAttributes<any>
      >
    | undefined;
};
