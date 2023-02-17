import {
  PropsWithChildren,
  ReactElement,
  RefAttributes,
  WeakValidationMap,
} from 'react';

import {
  AsProp,
  InheritedProps,
  PolymorphicAs,
  PropsToOmit,
} from '../Polymorphic/Polymorphic.types';
import { PolymorphicRef } from '..';

/**
 * A mock of the @types/node URLObject.
 * Used by libraries like NextJS
 * */
interface NodeUrlLike {
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

/** Either an anchor tag, or a component that accepts an `href` */
export type AnchorLike =
  | 'a'
  | React.ComponentType<{ href: string }>
  | React.ComponentType<{ href: NodeUrlLike }>;

/**
 * Wrapping props in this type ensures that if `href` is defined,
 * the `as` type is set to `AnchorLike`, and all anchor props are accepted
 */
export type InferredAnchorLikeProps<
  T extends AnchorLike | undefined,
  P = {},
> = {
  href: string | NodeUrlLike;
  as?: T extends AnchorLike ? T : 'a';
} & P;

/**
 * Inferred extension of {@link PolymorphicProps}
 *
 * If `T` is an anchor, or undefined, then we explicitly add an `href`
 *
 * else if T is something else and href is defined, we force `as` to be 'a',
 * otherwise, href is `never`.
 *
 * Note: It's a known issue that passing a component with no props (`() => <></>`)
 * as the `as` prop will be improperly flagged as `AnchorLike`.
 * We have decided not to add additional type complexity to address this minor edge case.
 */
export type InferredPolymorphicProps<
  T extends PolymorphicAs,
  XP = {},
> = T extends AnchorLike | undefined
  ? PropsWithChildren<InferredAnchorLikeProps<T, XP>> &
      Omit<InheritedProps<T>, PropsToOmit<T, XP>>
  : PropsWithChildren<
      ({ href: string; as?: 'a' } | ({ href?: never } & AsProp<T>)) & XP
    > &
      Omit<InheritedProps<T>, PropsToOmit<T, XP>>;

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
