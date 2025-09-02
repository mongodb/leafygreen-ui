import { forwardRef } from 'react';

import {
  PolymorphicAs,
  PolymorphicComponentType,
  PolymorphicRenderFunction,
} from './Polymorphic.types';

/**
 * Factory function that returns a polymorphic component.
 *
 * If you want to expose `as` as a prop of your component,
 * use this `Polymorphic` factory function and related hooks.
 *
 * However, if the logic defining the `as` prop is defined internally within your component,
 * use the standalone `Polymorph` component.
 *
 * For more, see {@link https://github.com/mongodb/leafygreen-ui/blob/main/packages/polymorphic/README.md | README.md}
 */
export const Polymorphic = <
  XP extends object = {},
  DefaultAs extends PolymorphicAs = PolymorphicAs,
>(
  render: PolymorphicRenderFunction<XP, DefaultAs>,
  displayName?: string,
): PolymorphicComponentType<XP, DefaultAs> => {
  // Here we only know the additional props,
  // but we don't know what `as` is, or what props to inherit
  // (i.e. we don't know if `as="button"`, and if `type` is a valid prop)

  // If no `ref` arg was passed in, we use the plain render function
  const PolyComponent: PolymorphicComponentType<XP, DefaultAs> =
    render.length === 1
      ? render
      : // @ts-ignore React17 In TS<5.0 this is `ReactElement` but in 5+ it's `ReactNode`
        (forwardRef(render) as PolymorphicComponentType<XP, DefaultAs>);

  PolyComponent.displayName =
    displayName ?? render.displayName ?? 'PolymorphicComponent';
  return PolyComponent;
};
