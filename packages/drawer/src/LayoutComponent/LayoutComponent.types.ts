import { DarkModeProps, HTMLElementProps } from '@leafygreen-ui/lib';

export interface LayoutComponentProps
  extends DarkModeProps,
    Omit<HTMLElementProps<'div'>, 'children'> {
  /**
   * Slot prop for the drawer
   */
  drawer?: React.ReactNode;

  /**
   * The content to be rendered inside the Drawer
   */
  children: React.ReactNode;
}
