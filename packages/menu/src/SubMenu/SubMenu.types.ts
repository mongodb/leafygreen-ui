import { ExitHandler } from 'react-transition-group/Transition';

import { HTMLElementProps } from '@leafygreen-ui/lib';

import { Size } from '../types';

export interface SubMenuProps extends HTMLElementProps<'button'> {
  /**
   * Determines if `<SubMenu />` item appears open
   */
  open?: boolean;

  /**
   * Function to set the value of `open` in `<SubMenu />`
   */
  setOpen?: (value: boolean) => void;

  /**
   * className applied to `SubMenu` root element
   */
  className?: string;

  /**
   * Content to appear below main text of SubMenu
   */
  description?: string | React.ReactElement;

  /**
   * Determines if `<SubMenu />` item appears disabled
   */
  disabled?: boolean;

  /**
   * Determines if `<SubMenu />` item appears active
   */
  active?: boolean;

  /**
   * Slot to pass in an Icon rendered to the left of `SubMenu` text.
   *
   * @type `<Icon />` component
   *
   */
  glyph?: React.ReactElement;

  /**
   * Main text rendered in `SubMenu`.
   */
  title?: string;

  /**
   * Content rendered inside of `SubMenu`.
   * @type `<MenuItem />` | `<SubMenu />` | `<MenuGroup />` | `<MenuSeparator />`
   */
  children?: React.ReactNode;

  onClick?: React.MouseEventHandler;

  onExited?: ExitHandler<HTMLElement>;

  href?: string;

  /**
   * Size of the MenuItem component, can be `default` or `large`. This size only affects the parent MenuItem, nested child MenuItems do not change.
   */
  size?: Size;
}
