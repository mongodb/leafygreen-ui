import React from 'react';

import {
  PolymorphicComponentType,
  PolymorphicRenderFunction,
} from './Polymorphic.types';

/**
 * Factory function that returns a polymorphic component
 */
export const Polymorphic = <XP extends object = {}>(
  render: PolymorphicRenderFunction<XP>,
  displayName?: string,
): PolymorphicComponentType<XP> => {
  // Here we only know the additional props,
  // but don' t know what `as` is, or what props to inherit

  // If no `ref` arg was passed in, we use the plain render function
  const PolyComponent: PolymorphicComponentType<XP> =
    render.length === 1 ? render : React.forwardRef(render);

  PolyComponent.displayName =
    displayName ?? render.displayName ?? 'PolymorphicComponent';
  return PolyComponent;
};
