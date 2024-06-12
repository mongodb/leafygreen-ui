import {
  ComponentPropsWithoutRef,
  ComponentType,
  ReactElement,
  RefAttributes,
  WeakValidationMap,
} from 'react';

import { PartialRequired } from '@leafygreen-ui/lib';

import { PolymorphicAs } from '../Polymorphic/Polymorphic.types';
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
export interface AnchorLikeProps<TAsProp extends AnchorLike | undefined> {
  href: string | NodeUrlLike;
  as?: TAsProp extends undefined ? 'a' : TAsProp;
}

/**
 * Union of {@link AnchorLikeProps} and {@link InheritedProps}
 */
export type InheritedExplicitAnchorLikeProps<
  TAsProp extends AnchorLike | undefined,
> = { as?: TAsProp } & (TAsProp extends AnchorLike
  ? PartialRequired<ComponentPropsWithoutRef<TAsProp>, 'href'>
  : { ERROR: 'Component `as` prop undefined' });

/**
 * A Discriminated Union, where:
 * - If `href` is provided to the component as a prop, (but `as` is not)
 * then we infer that the `as` prop is `a`, and inherit anchor props.
 * - Otherwise `href` is invalid, and we treat the `as` prop as the provided T
 */
/* export type InferredProps<
  TAsProp extends PolymorphicAs,
  TComponentProps = {},
> = PropsWithChildren<
  (
    | ({
        href: string;
        as?: 'a';
      } & InheritedProps<'a', TComponentProps>)
    | ({
        href?: never;
        as?: TAsProp;
      } & InheritedProps<TAsProp, TComponentProps>)
  ) &
    TComponentProps
>; */

/** Anchor props where `href` is required */
export type InferredAnchorProps = {
  href: string;
  as?: 'a';
} & ComponentPropsWithoutRef<'a'>;

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
  TAsProp extends PolymorphicAs,
  TComponentProps = {},
> = TComponentProps &
  (TAsProp extends 'a'
    ? // if the `as` prop is AnchorLike, return explicit AnchorLike props
      { as?: TAsProp } & PartialRequired<
        ComponentPropsWithoutRef<TAsProp>,
        'href'
      >
    :
        | InferredAnchorProps
        | (TAsProp extends PolymorphicAs
            ? {
                as?: PolymorphicAs;
              } & ComponentPropsWithoutRef<TAsProp>
            : {
                ERROR: 'Provided `as` prop must extend `React.ElementType`';
              }));

/**
 * Inferred props clone of {@link PolymorphicPropsWithRef}
 */
export type InferredPolymorphicPropsWithRef<
  TAsProp extends PolymorphicAs,
  TComponentProps = {},
> = InferredPolymorphicProps<TAsProp, TComponentProps> & {
  /** The ref object returned by `React.useRef` */
  ref?: PolymorphicRef<TAsProp>;
};

/**
 * Inferred Props clone of {@link PolymorphicRenderFunction}
 */
export interface InferredPolymorphicRenderFunction<
  TComponentProps = {},
  TDefaultAs extends PolymorphicAs = PolymorphicAs,
> {
  <TAsProp extends PolymorphicAs = TDefaultAs>(
    props: InferredPolymorphicProps<TAsProp, TComponentProps>,
    ref: PolymorphicRef<TAsProp>,
  ): ReactElement | null;
  displayName?: string;
  propTypes?: never;
}

/**
 * Inferred props clone of {@link PolymorphicComponentType}
 */
export type InferredPolymorphicComponentType<
  TComponentProps = {},
  TDefaultAs extends PolymorphicAs = PolymorphicAs,
> = InferredPolymorphicRenderFunction<TComponentProps, TDefaultAs> & {
  // FIXME: propTypes will be broken for any inherited props
  propTypes?:
    | WeakValidationMap<
        InferredPolymorphicProps<PolymorphicAs, TComponentProps> &
          RefAttributes<any>
      >
    | undefined;
};
