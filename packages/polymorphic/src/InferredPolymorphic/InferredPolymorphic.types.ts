import {
  ComponentPropsWithRef,
  ComponentType,
  ReactElement,
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
  | ComponentType<{
      /**
       * The URL that the hyperlink points to
       */
      href: string;
    }>
  | ComponentType<{
      /**
       * The URL object for the hyperlink
       */
      href: NodeUrlLike;
    }>;

/**
 * Wrapping props in this type ensures that if `href` is defined,
 * the `as` type can only be `AnchorLike`, and all anchor props are accepted
 */
export interface AnchorLikeProps<TAsProp extends AnchorLike | undefined> {
  /**
   * The URL that the hyperlink points to or a URL object
   */
  href: string | NodeUrlLike;
  /**
   * The element or component to render as
   */
  as?: TAsProp extends undefined ? 'a' : TAsProp;
}

/** Anchor props where `href` is required */
export type InferredAnchorProps = {
  /**
   * The URL that the hyperlink points to
   */
  href: string;
  /**
   * The element or component to render as
   */
  as?: 'a';
} & ComponentPropsWithRef<'a'>;

/**
 * Union of {@link AnchorLikeProps} and {@link InheritedProps}
 */
export type InheritedExplicitAnchorLikeProps<TAsProp extends AnchorLike> = {
  /**
   * The element or component to render as
   */
  as?: TAsProp;
} & Omit<PartialRequired<ComponentPropsWithRef<TAsProp>, 'href'>, 'as'>;

/**
 * Extends the default component props (or intrinsic attributes)
 * of the provided `TAsProp` type.
 *
 * We also omit any inherited keys that may be overridden by
 * explicit component props
 *
 * e.g.
 * - if `as = "label"`, the component should accept the `htmlFor` attribute)
 * - if `as = { RemixLink }`, the component should accept the `to` prop.
 * ([see Remix docs](https://remix.run/docs/en/main/components/link))
 */
export type InheritedComponentProps<
  TAsProp extends PolymorphicAs,
  TComponentProps,
> = {
  as?: PolymorphicAs;
} & Omit<ComponentPropsWithRef<TAsProp>, keyof TComponentProps | 'as'>;

/**
 *
 * Sets the inferred prop types of an inferred Polymorphic component
 *
 * First, we extend any provided component props (`TComponentProps`)
 *
 * If the provided `as` prop (`TAsProp`) extends the type {@link AnchorLike}
 * then we extend {@link InheritedExplicitAnchorLikeProps}
 *
 * Otherwise, (if `TAsProp` is any other type),
 * then we create a Discriminated Union of
 *  - {@link InferredAnchorProps} - which expects `href` to be defined,
 * and sets the component props to the default `a` element props, and
 *  - {@link InheritedComponentProps} - which extends the intrinsic attributes
 * of the provided `as` prop
 *
 */
export type InferredPolymorphicProps<
  TAsProp extends PolymorphicAs,
  TComponentProps = {},
> = (TAsProp extends AnchorLike
  ? InheritedExplicitAnchorLikeProps<TAsProp> // if the `as` prop is AnchorLike, return explicit AnchorLike props
  : InferredAnchorProps | InheritedComponentProps<TAsProp, TComponentProps>) &
  Omit<TComponentProps, 'as'>;

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
    props: InferredPolymorphicPropsWithRef<TAsProp, TComponentProps>,
    ref: PolymorphicRef<TAsProp>,
  ): ReactElement | null;
  displayName?: string;
  // propTypes?: never;
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
        InferredPolymorphicProps<PolymorphicAs, TComponentProps>
      >
    | undefined;
};
