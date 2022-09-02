export interface SideNavProps {
  /**
   * Class name that will be applied to the root-level element.
   */
  className?: string;

  /**
   * Content that will be rendered inside the root-level element.
   */
  children?: React.ReactNode;

  id?: string;

  /**
   * Determines the base font size (in pixels) of the Side Nav
   */
  baseFontSize?: 14 | 16;

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
