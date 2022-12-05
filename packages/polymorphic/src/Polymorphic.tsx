import React from 'react';
import { PolymorphicComponentType } from './Polymorphic.types';

/** Returns a polymorphic component */
export const Polymorphic = <P extends object = {}>(
  render: PolymorphicComponentType<P>,
  displayName?: string,
): PolymorphicComponentType<P> => {
  // Here we only know the additional props,
  // but don' t know what `as` is, or what props to inherit

  if (render.length === 1) {
    // If no `ref` arg was passed in
    const PolyComponent = render;
    PolyComponent.displayName = displayName ?? render.displayName;
    return PolyComponent;
  }

  const PolyComponent = React.forwardRef(render);
  PolyComponent.displayName = displayName ?? render.displayName;
  return PolyComponent;
};
