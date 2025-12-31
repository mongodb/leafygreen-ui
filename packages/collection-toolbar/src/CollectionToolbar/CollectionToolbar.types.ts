import { ComponentPropsWithRef } from 'react';

import { DarkModeProps, LgIdProps } from '@leafygreen-ui/lib';

import { Size, Variant } from '../shared.types';

export interface CollectionToolbarProps
  extends ComponentPropsWithRef<'div'>,
    DarkModeProps,
    LgIdProps {
  /**
   * The size of the CollectionToolbar and it's sub-components.
   *
   * @default `'default'`
   */
  size?: typeof Size.Default | typeof Size.Small;
  /**
   * The variant of the CollectionToolbar. Determines the layout of the CollectionToolbar.
   *
   * @default `'default'`
   */
  variant?: Variant;
}
