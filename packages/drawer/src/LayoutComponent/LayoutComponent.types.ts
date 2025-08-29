import { DarkModeProps, HTMLElementProps } from '@leafygreen-ui/lib';

export interface LayoutComponentProps
  extends DarkModeProps,
    Omit<HTMLElementProps<'div'>, 'children'> {
  /**
   * Slot prop for the content that should render in the drawer column.
   */
  panelContent?: React.ReactNode;

  /**
   * The content to be rendered in the content column.
   */
  children: React.ReactNode;
}
