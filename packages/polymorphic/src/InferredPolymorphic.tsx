import { usePolymorphic } from './Polymorphic.hooks';
import { AnchorProps, PolymorphicAs } from './Polymorphic.types';

/**
 * Wrapping props in this type ensures that if `href` is defined,
 * the `as` type is set to `'a'`, and all anchor props are accepted
 */
export type InferredPolymorphicProps<P = {}> =
  | (P & {
      href: string;
      as?: 'a';
    } & AnchorProps)
  | P;

export function getInferredPolymorphComponent(
  as?: PolymorphicAs,
  rest?: { [key: string]: any },
): PolymorphicAs | undefined {
  if (!as) {
    if (typeof rest?.href === 'string') {
      as = 'a' as PolymorphicAs;
    }
  }

  return as;
}

/**
 *
 */
export function useInferredPolymorphic(
  as?: PolymorphicAs,
  rest?: { [key: string]: any },
) {
  as = getInferredPolymorphComponent(as, rest);
  return usePolymorphic(as);
}
