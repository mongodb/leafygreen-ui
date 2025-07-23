import React from 'react';

import { PolymorphicAs } from '../Polymorphic';

import {
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
  TComponentProps extends object = {},
  TDefaultAs extends PolymorphicAs = PolymorphicAs,
>(
  render: InferredPolymorphicRenderFunction<TComponentProps, TDefaultAs>,
  displayName?: string,
): InferredPolymorphicComponentType<TComponentProps, TDefaultAs> => {
  let PolyComponent: InferredPolymorphicComponentType<
    TComponentProps,
    TDefaultAs
  >;

  if (render.length === 1) {
    PolyComponent = render;
  } else {
    type PropTypes = Parameters<typeof render>[0];
    type RefType = Parameters<typeof render>[1];
    /// @ts-expect-error - types too complex. Return type is still computed correctly
    PolyComponent = React.forwardRef<RefType, PropTypes>(render);
  }

  PolyComponent.displayName =
    displayName ?? render.displayName ?? 'PolymorphicComponent';
  return PolyComponent;
};
