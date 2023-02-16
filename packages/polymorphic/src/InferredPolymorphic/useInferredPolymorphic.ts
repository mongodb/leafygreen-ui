import { usePolymorphic } from '../Polymorphic/Polymorphic.hooks';
import { PolymorphicAs } from '../Polymorphic/Polymorphic.types';

/**
 * Internal function to compute the inferred polymorphic component based on the `as` prop, and any other props passed in
 * @internal
 */
function getInferredPolymorphComponent(
  as?: PolymorphicAs,
  rest?: { [key: string]: any },
  defaultAs?: PolymorphicAs,
): PolymorphicAs | undefined {
  if (typeof rest?.href === 'string' && (!as || as === defaultAs)) {
    as = 'a' as PolymorphicAs;
  } else if (!as) {
    as = 'div' as PolymorphicAs;
  }

  return as;
}

/**
 * A hook that returns a Component and `ref` based on the `as` prop passed in,
 * and any other props provided.
 *
 * The returned `Component` can be inferred by the additional props passed in.
 * (i.e. if no `as` prop is provided, but an `href` prop is defined, then `as` will
 * be inferred to be `a`
 */
export function useInferredPolymorphic(
  as?: PolymorphicAs,
  rest?: { [key: string]: any },
  defaultAs?: PolymorphicAs,
) {
  as = getInferredPolymorphComponent(as, rest, defaultAs);
  return usePolymorphic(as);
}
