import { usePolymorphic } from '../Polymorphic/Polymorphic.hooks';
import { PolymorphicAs } from '../Polymorphic/Polymorphic.types';

/**
 * A hook that computes & returns the inferred polymorphic component based on the `as` prop, and any other props passed in.
 *
 * For client-side components, prefer using `useInferredPolymorphic`, which returns a typed `ref` as well as the polymorphic component
 */
export function useInferredPolymorphicComponent(
  as?: PolymorphicAs,
  rest?: { [key: string]: any },
  defaultAs?: PolymorphicAs,
): PolymorphicAs | undefined {
  defaultAs = defaultAs ?? ('div' as PolymorphicAs);
  return as ? as : typeof rest?.href === 'string' ? 'a' : defaultAs;
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
  as = useInferredPolymorphicComponent(as, rest, defaultAs);
  return usePolymorphic(as);
}
