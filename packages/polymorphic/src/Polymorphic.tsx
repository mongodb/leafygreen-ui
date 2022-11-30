import React from 'react';
import { PolymorphicComponentType } from './Polymorphic.types';

/** Returns a polymorphic component */
export const Polymorphic = <P extends object = {}>(
  render: PolymorphicComponentType<P>,
  displayName?: string,
): PolymorphicComponentType<P> => {
  // If no `ref` arg was passed in
  if (render.length === 1) {
    const PolyComponent = render;
    PolyComponent.displayName = displayName ?? render.displayName;
    return PolyComponent;
  }

  const PolyComponent = React.forwardRef(render);
  PolyComponent.displayName = displayName ?? render.displayName;
  return PolyComponent;
};
