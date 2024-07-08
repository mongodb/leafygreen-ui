import { PolymorphicAs } from '../../Polymorphic';

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
