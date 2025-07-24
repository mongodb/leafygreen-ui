import { DarkModeProps, HTMLElementProps } from '@leafygreen-ui/lib';

export interface LayoutComponentProps
  extends DarkModeProps,
    Omit<HTMLElementProps<'div'>, 'children'> {
  /**
   * Determines if the Toolbar is present in the layout
   */
  hasToolbar?: boolean;

  /**
   * Determines if the Drawer is open. This will shift the layout to the right by the width of the drawer + toolbar if it exists, if the display mode is set to 'embedded'.
   */
  isDrawerOpen?: boolean;

  /**
   * Slot prop for the drawer
   */
  drawer?: React.ReactNode;

  /**
   * The content to be rendered inside the Drawer
   */
  children: React.ReactNode;
}
