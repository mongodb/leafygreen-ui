import { ReactNode } from 'react';

import { PopoverProps } from '@leafygreen-ui/popover';

export interface MenuProps extends Omit<PopoverProps, 'active'> {
  /**
   * The menu items, or submenus
   * @type `<MenuItem />` | `<SubMenu />` | `<MenuGroup />` | `<MenuSeparator />`
   */
  children: ReactNode;

  /**
   * A slot for the element used to trigger the Menu. Passing a trigger allows
   * Menu to control opening and closing itself internally.
   */
  trigger?: React.ReactElement | Function;

  /**
   * Determines the open state of the menu
   *
   * default: `false`
   */
  open?: boolean;

  /**
   * Callback to change the open state of the Menu.
   *
   */
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;

  /**
   * Callback to determine whether or not Menu should close when user tries to close it.
   *
   */
  shouldClose?: () => boolean;

  /**
   * The max height of the menu (in px). Defaults to 256
   */
  maxHeight?: number;

  /**
   * Determines whether or not the component will be rendered in dark mode.
   *
   * default: `false`
   */
  darkMode?: boolean;

  /**
   * id passed to the menu dropdown.
   */
  id?: string;
}
