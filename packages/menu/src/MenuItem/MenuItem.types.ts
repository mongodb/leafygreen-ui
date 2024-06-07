import { FocusEventHandler, ReactElement, ReactNode } from 'react';

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
   * Size of the MenuItem component, can be `default` or `large`
   */
  size?: Size;

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
}

export interface FocusableMenuItemProps {
  children: ReactElement;
  onFocus?: FocusEventHandler;
}
