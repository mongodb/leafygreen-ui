import { ExitHandler } from 'react-transition-group/Transition';

export const Size = {
  Default: 'default',
  Large: 'large',
} as const;

export type Size = typeof Size[keyof typeof Size];

export interface BaseMenuItemProps {
  /**
   * Determines whether or not the MenuItem is active.
   */
  active?: boolean;

  /**
   * Description element displayed below title in MenuItem.
   */
  description?: React.ReactNode;

  /**
   * Determines whether or not the MenuItem is disabled.
   */
  disabled?: boolean;

  /**
   * Slot to pass in an Icon rendered to the left of `MenuItem` text.
   */
  glyph?: React.ReactElement;

  /**
   * Size of the MenuItem component, can be `default` or `large`
   */
  size?: Size;

  /**
   * className applied to  `li` element
   */
  className?: string;

  /**
   * Content to appear inside of `<MenuItem />` component
   */
  children?: React.ReactNode;

  href?: string;
}

export type SubMenuProps = {
  /**
   * Determines if `<SubMenu />` item appears open
   */
  open?: boolean;

  /**
   * Function to set the value of `open` in `<SubMenu />`
   */
  setOpen?: (value: boolean) => void;

  /**
   * Main text rendered in `SubMenu`.
   */
  title?: string;

  onClick?: React.MouseEventHandler;

  onExited?: ExitHandler<HTMLElement>;
} & BaseMenuItemProps;
