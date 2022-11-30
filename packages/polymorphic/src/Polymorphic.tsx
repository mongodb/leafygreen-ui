import React from 'react';
import { PolymorphicComponentType } from './Polymorphic.types';

/** Returns a polymorphic component */
export const Polymorphic = <P extends object = {}>(
  render: PolymorphicComponentType<P>,
): PolymorphicComponentType<P> => {
  // If no `ref` arg was passed in
  if (render.length === 1) {
    const polyComponent = render;
    polyComponent.displayName = render.displayName;
    return polyComponent;
  }

  const polyComponent = React.forwardRef(render);
  polyComponent.displayName = render.displayName;
  return polyComponent;
};
