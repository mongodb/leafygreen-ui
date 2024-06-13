import { ComponentPropsWithoutRef } from 'react';

import { consoleOnce } from '@leafygreen-ui/lib';

import { PolymorphicAs } from '../Polymorphic';

const fallbackAs = 'div';

/**
 * Returns a loosely typed prop object,
 * with a defined `as` value,
 * a potentially defined `href` prop,
 * and the rest of the provided props,
 * typed as a union of attributes on all PolymorphicAs value
 */
export function getLooseInferredPolymorphicProps(
  as?: PolymorphicAs,
  rest?: Record<string, any>,
  defaultAs?: PolymorphicAs,
): {
  as: PolymorphicAs;
  href?: string;
} & ComponentPropsWithoutRef<PolymorphicAs> {
  const href = rest?.href;

  // If `as` is explicitly "a", we return anchor props, with explicit href
  if (as && as === 'a') {
    if (!href || typeof href !== 'string') {
      consoleOnce.error(
        'LG Polymorphic error',
        'Component received `as="a"`, but did not receive an `href` prop',
      );
    }

    return {
      as: 'a' as PolymorphicAs,
      href: typeof href === 'string' ? href : undefined,
      ...rest,
    };
  }

  // If `as` is anything else, but rest.href is a string, return explicit anchor props
  if (href) {
    return {
      as: 'a',
      href,
      ...rest,
    };
  }

  // If `as` is otherwise defined, we return that element's component props
  if (as) {
    return {
      as,
      href: undefined,
      ...rest,
    };
  }

  // If `as` is undefined, we return the default argument's props
  return {
    as: defaultAs || fallbackAs,
    ...rest,
  };
}

/**
 *
 * Returns a strongly-typed props object,
 *
 * WARING - using this function unnecessarily can cause TypeScript
 * to slow down dramatically.
 *
 * In most cases {@link getLooseInferredPolymorphicProps} will be sufficient
 *
 * If `as` is explicitly "a", we return anchor props, with explicit href.
 * If `as` is something else, but rest.href is a string, return explicit anchor props.
 * If `as` is otherwise defined, we return that element's component props.
 * If `as` is undefined, we return the default argument's props.
 * If default is undefined, use the fallback as 'div'
 *
 */
// If `as` is explicitly "a", we return anchor props, with explicit href
export function getStronglyInferredPolymorphicProps<
  TAs extends 'a',
  TRestRest extends Record<string, any>,
  TDefault extends PolymorphicAs = typeof fallbackAs,
>(
  as: TAs,
  rest: TRestRest,
  defaultAs?: TDefault,
): { as: 'a'; href: string } & ComponentPropsWithoutRef<'a'> & TRestRest;

// If `as` is something else, but rest.href is a string, return explicit anchor props
export function getStronglyInferredPolymorphicProps<
  TAs extends PolymorphicAs | undefined,
  TRest extends { href: string },
  TDefault extends PolymorphicAs = typeof fallbackAs,
>(
  as: TAs,
  rest: TRest,
  defaultAs?: TDefault,
): { as: 'a'; href: string } & ComponentPropsWithoutRef<'a'> & TRest;

// If `as` is otherwise defined, we return that element's component props
export function getStronglyInferredPolymorphicProps<
  TAs extends PolymorphicAs | undefined,
  TRest extends Record<string, any>,
  TDefault extends PolymorphicAs = typeof fallbackAs,
>(
  as: TAs,
  rest: TRest,
  defaultAs?: TDefault,
): TAs extends PolymorphicAs
  ? { as: TAs; href?: string } & ComponentPropsWithoutRef<TAs> & TRest
  : { as: TDefault; href?: string } & ComponentPropsWithoutRef<TDefault> &
      TRest;

// If default is undefined, use the fallback as
export function getStronglyInferredPolymorphicProps<
  TAs extends PolymorphicAs | undefined,
  TRest extends Record<string, any>,
  TDefault extends undefined,
>(
  as: TAs,
  rest: TRest,
  defaultAs?: TDefault,
): { as: typeof fallbackAs; href?: string } & ComponentPropsWithoutRef<
  typeof fallbackAs
> &
  TRest;

export function getStronglyInferredPolymorphicProps<
  TAs extends PolymorphicAs | undefined,
  TRest extends Record<string, any>,
  TDefault extends PolymorphicAs = typeof fallbackAs,
>(as?: TAs, rest?: TRest, defaultAs?: TDefault) {
  return getLooseInferredPolymorphicProps(as, rest, defaultAs);
}

/**
 * A type guard asserting that the provided `as` prop and rest props
 * satisfy the intrinsic attributes of an anchor (`<a>`) element
 */
export const isAnchorProps = <TProps extends any>(
  as?: PolymorphicAs,
  props?: TProps,
): props is ComponentPropsWithoutRef<'a'> & TProps => {
  return as === 'a';
};
