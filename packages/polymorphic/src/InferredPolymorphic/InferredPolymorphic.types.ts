import {
  PropsWithChildren,
  ReactElement,
  RefAttributes,
  WeakValidationMap,
} from 'react';

import {
  InheritedProps,
  PolymorphicAs,
  PolymorphicProps,
  PropsToOmit,
} from '../Polymorphic/Polymorphic.types';
import { PolymorphicRef } from '..';

/** Either an anchor tag, or a component that accepts an `href` */
type AnchorLike = 'a' | React.ComponentType<{ href: string }>;

/**
 * Wrapping props in this type ensures that if `href` is defined,
 * the `as` type is set to `AnchorLike`, and all anchor props are accepted
 */
type InferredAnchorLikeProps<T extends AnchorLike | undefined, P = {}> = {
  href: string;
  as?: T extends AnchorLike ? AnchorLike : 'a';
} & P;

/**
 * Inferred clone of {@link PolymorphicProps}
 *
 * If `T` is an anchor, or undefined, then we explicitly add an `href`
 *
 * else if href is defined, we force `as` to be 'a',
 * otherwise we just extend standard polymorphic props
 */
export type InferredProps<T extends PolymorphicAs, XP = {}> = T extends
  | AnchorLike
  | undefined
  ? PropsWithChildren<InferredAnchorLikeProps<T, XP>> &
      Omit<InheritedProps<T>, PropsToOmit<T, XP>>
  : PolymorphicProps<T, XP>;

/**
 * Inferred props clone of {@link PolymorphicPropsWithRef}
 */
export type InferredPropsWithRef<
  T extends PolymorphicAs,
  XP = {},
> = InferredProps<T, XP> & {
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
    props: InferredPropsWithRef<T, XP>,
    ref: PolymorphicRef<T>,
  ): ReactElement | null;
  displayName?: string;
  propTypes?:
    | WeakValidationMap<InferredProps<PolymorphicAs, XP> & RefAttributes<any>>
    | unknown;
}

/**
 * Inferred Props clone of {@link PolymorphicRenderFunction}
 */
export interface InferredPolymorphicRenderFunction<
  XP = {},
  DefaultAs extends PolymorphicAs = PolymorphicAs,
> {
  <T extends PolymorphicAs = DefaultAs>(
    props: InferredPropsWithRef<T, XP>,
    ref: PolymorphicRef<T>,
  ): ReactElement | null;
  displayName?: string;
  propTypes?: never;
}
