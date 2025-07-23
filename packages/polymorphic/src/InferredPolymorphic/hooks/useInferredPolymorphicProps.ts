import { ComponentPropsWithoutRef } from 'react';

import { consoleOnce } from '@leafygreen-ui/lib';

import { FALLBACK, PolymorphicAs } from '../../Polymorphic';

/**
 * Returns a loosely typed prop object,
 * with a defined `as` value,
 * a potentially defined `href` prop,
 * and the rest of the provided props,
 * typed as a union of attributes on all PolymorphicAs value
 *
 * For client-side components, prefer using `useInferredPolymorphic`,
 * which also returns a typed `ref`
 */
export function useInferredPolymorphicProps<
  T extends PolymorphicAs,
  R extends { [key: string]: any },
  D extends PolymorphicAs,
>(
  asProp?: T,
  rest?: R,
  defaultAs?: D,
): {
  /** The element or component to render as */
  as: PolymorphicAs;
  /** The URL that the hyperlink points to */
  href?: string;
} & ComponentPropsWithoutRef<PolymorphicAs> {
  const href = rest?.href;

  // If `as` is explicitly "a", we return anchor props, with explicit href
  if (asProp && asProp === 'a') {
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

  // If `as` is otherwise defined, we return that element's component props
  if (asProp) {
    return {
      as: asProp,
      href: href || undefined,
      ...rest,
    };
  }

  // If `as` not defined, but rest.href is a string, return explicit anchor props
  if (href && typeof href === 'string') {
    return {
      as: 'a',
      href,
      ...rest,
    };
  }

  // If `as` is undefined, we return the default argument's props
  return {
    as: defaultAs || FALLBACK,
    ...rest,
  };
}
