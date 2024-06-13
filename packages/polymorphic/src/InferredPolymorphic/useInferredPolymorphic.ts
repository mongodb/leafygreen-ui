import { ComponentPropsWithoutRef } from 'react';

import { consoleOnce } from '@leafygreen-ui/lib';

import { usePolymorphicRef } from '../Polymorphic/Polymorphic.hooks';
import { PolymorphicAs } from '../Polymorphic/Polymorphic.types';

const fallbackAs = 'div';

/**
 * A hook that computes & returns the inferred polymorphic component based on the `as` prop, and any other props passed in.
 *
 * For client-side components, prefer using `useInferredPolymorphic`,
 * which also returns a typed `ref`
 */
export function useInferredPolymorphicComponent<
  T extends PolymorphicAs,
  R extends { [key: string]: any },
  D extends PolymorphicAs,
>(as?: T, rest?: R, defaultAs?: D): PolymorphicAs {
  return as
    ? as
    : typeof rest?.href === 'string'
    ? 'a'
    : defaultAs ?? ('div' as PolymorphicAs);
}

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
  as: PolymorphicAs;
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

  // If `as` is anything else, but rest.href is a string, return explicit anchor props
  if (href) {
    return {
      as: 'a',
      href,
      ...rest,
    };
  }

  // If `as` is otherwise defined, we return that element's component props
  if (asProp) {
    return {
      as: asProp,
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
 * A hook that returns a Component and `ref` based on the `as` prop passed in,
 * and any other props provided.
 *
 * The returned `Component` can be inferred by the additional props passed in.
 * (i.e. if no `as` prop is provided, but an `href` prop is defined, then `as` will
 * be inferred to be `a`
 */
export function useInferredPolymorphic<
  T extends PolymorphicAs,
  R extends { [key: string]: any },
  D extends PolymorphicAs,
>(asProp?: T, restArg?: R, defaultAs?: D) {
  const { as, ...rest } = useInferredPolymorphicProps(
    asProp,
    restArg,
    defaultAs,
  );

  const ref = usePolymorphicRef(as);

  return {
    Component: as,
    as,
    ref,
    rest,
  };
}
