import React from 'react';
import { AsProp, PolymorphicComponentType } from './Polymorphic.types';

/**
 * Wrapping props in this type ensures that if `href` is defined,
 * the `as` type is set to `'a'`
 */
export type PropsWithHref<P = {}> =
  | (P & {
      href: string;
    } & AsProp<'a'>)
  | P;

/** Returns a polymorphic component */
export const Polymorphic = <P extends object = {}>(
  render: PolymorphicComponentType<PropsWithHref<P>>,
  displayName?: string,
): PolymorphicComponentType<PropsWithHref<P>> => {
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
