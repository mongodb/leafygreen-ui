import { ReactElement, ReactNode } from 'react';

import { Size } from '../types';

const Variant = {
  Default: 'default',
  Destructive: 'destructive',
} as const;

type Variant = (typeof Variant)[keyof typeof Variant];

export { Variant };

export interface MenuItemProps {
  /**
   * Determines whether or not the MenuItem is disabled.
   */
  disabled?: boolean;

  /**
   * Slot to pass in an Icon rendered to the left of `MenuItem` text.
   * @type `<Icon />` component
   */
  glyph?: ReactElement;

  /**
   * Slot to pass an Icon rendered to the right of the MenuItem
   */
  rightGlyph?: ReactElement;

  /**
   * Content to appear inside of `<MenuItem />` component
   */
  children?: ReactNode;

  /**
   * Determines whether or not the MenuItem is active.
   */
  active?: boolean;

  /**
   * Description element displayed below title in MenuItem.
   */
  description?: ReactNode;

  /**
   * Variant of MenuItem
   */
  variant?: Variant;

  /**
   * Size of the MenuItem component, can be `default` or `large`
   *
   * @deprecated - Size no longer has any effect
   */
  // TODO: codemod to remove `size` props from existing implementations
  size?: Size;
}
