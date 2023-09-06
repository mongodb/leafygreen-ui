import { OneOf } from '@leafygreen-ui/lib';

import { Size } from '../types';

export interface BaseMenuItemProps {
  /**
   * Determines whether or not the MenuItem is disabled.
   */
  disabled?: boolean;

  /**
   * Slot to pass in an Icon rendered to the left of `MenuItem` text.
   * @type `<Icon />` component
   */
  glyph?: React.ReactElement;

  /**
   * Size of the MenuItem component, can be `default` or `large`
   */
  size?: Size;

  /**
   * Content to appear inside of `<MenuItem />` component
   */
  children?: React.ReactNode;
}

export type ActiveOrDestructive = OneOf<
  {
    /**
     * Determines whether or not the MenuItem is active.
     */
    active?: boolean;

    /**
     * Description element displayed below title in MenuItem.
     */
    description?: React.ReactNode;

    destructive?: never;
  },
  {
    /**
     * Determines if the MenuItem should appear as destructive.
     */
    destructive?: boolean;

    active?: never;
    description?: never;
  }
>;

export type MenuItemProps = BaseMenuItemProps & ActiveOrDestructive;

export interface FocusableMenuItemProps {
  children: React.ReactElement;
  onFocus?: React.FocusEventHandler;
}
