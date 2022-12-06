import React from 'react';
import { PolymorphicComponentType } from './Polymorphic.types';

/** Returns a polymorphic component */
export const Polymorphic = <P extends object = {}>(
  render: PolymorphicComponentType<P>,
  displayName?: string,
): PolymorphicComponentType<P> => {
  // Here we only know the additional props,
  // but don' t know what `as` is, or what props to inherit

  // If no `ref` arg was passed in, we use the plain render function
  const PolyComponent = render.length === 1 ? render : React.forwardRef(render);
  displayName = displayName ?? render.displayName ?? 'PolymorphicComponent';
  PolyComponent.displayName = displayName;
  return PolyComponent as PolymorphicComponentType<P>;
};
