import React from 'react';

import { PolymorphicAs } from '../Polymorphic';

import {
  // InferredAnchorLikeProps as InfAProps,
  InferredPolymorphicComponentType,
  InferredPolymorphicRenderFunction,
} from './InferredPolymorphic.types';

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
  render: InferredPolymorphicRenderFunction<XP, DefaultAs>,
  displayName?: string,
): InferredPolymorphicComponentType<XP, DefaultAs> => {
  // return Polymorphic<XP, DefaultAs>(
  //   render,
  //   displayName,
  // ) as InferredPolymorphicComponentType<XP, DefaultAs>;

  const PolyComponent: InferredPolymorphicComponentType<XP, DefaultAs> =
    /// @ts-expect-error
    render.length === 1 ? render : React.forwardRef(render);

  PolyComponent.displayName =
    displayName ?? render.displayName ?? 'PolymorphicComponent';
  return PolyComponent;
};
