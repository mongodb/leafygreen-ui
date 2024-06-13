import { ComponentPropsWithoutRef } from 'react';

import { consoleOnce } from '@leafygreen-ui/lib';

import { FALLBACK, PolymorphicAs } from '../../Polymorphic';

/**
 *
 * Returns a strongly-typed props object including the `as` prop,
 *
 * WARING - using this function unnecessarily can cause TypeScript
 * to slow down dramatically.
 *
 * In most cases simply calling `useInferredPolymorphic`,
 * and leveraging appropriate type guards will be sufficient
 *
 * - If `as` is explicitly "a", we return anchor props, with explicit href.
 * - If `as` is something else, but rest.href is a string, return explicit anchor props.
 * - If `as` is otherwise defined, we return that element's component props.
 * - If `as` is undefined, we return the default argument's props.
 * - If default is undefined, use the fallback as 'div'
 *
 */
// If `as` is explicitly "a", we return anchor props, with explicit href
export function useStrictInferredPolymorphicProps<
  TAs extends 'a',
  TRestRest extends Record<string, any>,
  TDefault extends PolymorphicAs = typeof FALLBACK,
>(
  as: TAs,
  rest: TRestRest,
  defaultAs?: TDefault,
): { as: 'a'; href: string } & ComponentPropsWithoutRef<'a'> & TRestRest;

// If `as` is something else, but rest.href is a string, return explicit anchor props
export function useStrictInferredPolymorphicProps<
  TAs extends PolymorphicAs | undefined,
  TRest extends { href: string },
  TDefault extends PolymorphicAs = typeof FALLBACK,
>(
  as: TAs,
  rest: TRest,
  defaultAs?: TDefault,
): { as: 'a'; href: string } & ComponentPropsWithoutRef<'a'> & TRest;

// If `as` is otherwise defined, we return that element's component props
export function useStrictInferredPolymorphicProps<
  TAs extends PolymorphicAs | undefined,
  TRest extends Record<string, any>,
  TDefault extends PolymorphicAs = typeof FALLBACK,
>(
  as: TAs,
  rest: TRest,
  defaultAs?: TDefault,
): TAs extends PolymorphicAs
  ? { as: TAs; href?: string } & ComponentPropsWithoutRef<TAs> & TRest
  : { as: TDefault; href?: string } & ComponentPropsWithoutRef<TDefault> &
      TRest;

// If default is undefined, use the fallback as
export function useStrictInferredPolymorphicProps<
  TAs extends PolymorphicAs | undefined,
  TRest extends Record<string, any>,
  TDefault extends undefined,
>(
  as: TAs,
  rest: TRest,
  defaultAs?: TDefault,
): { as: typeof FALLBACK; href?: string } & ComponentPropsWithoutRef<
  typeof FALLBACK
> &
  TRest;

export function useStrictInferredPolymorphicProps<
  TAs extends PolymorphicAs | undefined,
  TRest extends Record<string, any>,
  TDefault extends PolymorphicAs = typeof FALLBACK,
>(as?: TAs, rest?: TRest, defaultAs?: TDefault) {
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
    as: defaultAs || FALLBACK,
    ...rest,
  };
}
