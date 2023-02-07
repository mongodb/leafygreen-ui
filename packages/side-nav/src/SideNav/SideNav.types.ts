import { BaseFontSize } from '@leafygreen-ui/leafygreen-provider';
import { DarkModeProps, HTMLElementProps } from '@leafygreen-ui/lib';
export interface SideNavProps extends HTMLElementProps<'nav'>, DarkModeProps {
  /**
   * Content that will be rendered inside the root-level element.
   *
   * @type `<SideNavItem />` | `<SideNavGroup />`
   */
  children?: React.ReactNode;

  id?: string;

  /**
   * Determines the base font size (in pixels) of the Side Nav
   */
  baseFontSize?: BaseFontSize;

  /**
   * Provides an override for the SideNav width (in pixels).
   */
  widthOverride?: number;

  /**
   * Allows consuming applications to control the collapsed state of the navigation.
   */
  collapsed?: boolean;

  /**
   * Consuming application's collapsed-state management controller
   */
  setCollapsed?: React.Dispatch<React.SetStateAction<boolean>>;
}
