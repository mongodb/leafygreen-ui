import { PolymorphicAs, usePolymorphicRef } from '../../Polymorphic';

import { useInferredPolymorphicProps } from './useInferredPolymorphicProps';

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
