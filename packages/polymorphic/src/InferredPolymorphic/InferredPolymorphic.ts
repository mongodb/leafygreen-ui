import { Polymorphic, PolymorphicAs } from '../Polymorphic';
import {
  PolymorphicComponentType,
  PolymorphicRenderFunction,
} from '../Polymorphic/Polymorphic.types';

import { InferredPolymorphicProps } from './InferredPolymorphic.types';

/**
 * Inferred copy of the {@link Polymorphic} factory function.
 * Returns a polymorphic component that can infer the `as` prop as anchor based on a provided `href`
 *
 * For more, see {@link https://github.com/mongodb/leafygreen-ui/blob/main/packages/polymorphic/README.md | README.md}
 */
export const InferredPolymorphic = <
  XP extends object = {},
  DefaultAs extends PolymorphicAs = PolymorphicAs,
>(
  render: PolymorphicRenderFunction<XP, DefaultAs>,
  displayName?: string,
): PolymorphicComponentType<InferredPolymorphicProps<XP>, DefaultAs> => {
  return Polymorphic<InferredPolymorphicProps<XP>, DefaultAs>(
    render,
    displayName,
  );
};
