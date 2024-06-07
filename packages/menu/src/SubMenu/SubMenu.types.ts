import { type Dispatch, type SetStateAction } from 'react';
import { ExitHandler } from 'react-transition-group/Transition';

import { HTMLElementProps } from '@leafygreen-ui/lib';

import { MenuItemProps } from '../MenuItem';

export interface SubMenuProps
  extends HTMLElementProps<'button'>,
    Omit<MenuItemProps, 'children' | 'rightGlyph' | 'variant'> {
  /**
   * Determines if `<SubMenu />` item appears open
   */
  open?: boolean;

  /**
   * Function to set the value of `open` in `<SubMenu />`
   */
  setOpen?: Dispatch<SetStateAction<boolean>>;

  /**
   * Main text rendered in `SubMenu`.
   */
  // TODO: Should this be a `ReactNode`?
  title?: string;

  /**
   * Content rendered inside of `SubMenu`.
   * @type `<MenuItem />` | `<SubMenu />` | `<MenuGroup />` | `<MenuSeparator />`
   */
  children?: React.ReactNode;

  /**
   * Callback fired when the Submenu opens
   */
  onEntered?: ExitHandler<HTMLElement>;

  /**
   * Callback fired when the Submenu closes
   */
  onExited?: ExitHandler<HTMLElement>;
}
