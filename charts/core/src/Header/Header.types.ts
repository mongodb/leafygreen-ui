import { HTMLElementProps } from '@leafygreen-ui/lib';

export interface HeaderProps extends Omit<HTMLElementProps<'div'>, 'title'> {
  /**
   * The title of the chart
   */
  title: string;

  /**
   * Whether to display divider line on top of header.
   */
  showDivider?: boolean;

  /**
   * Content to be rendered to the right of the label.
   */
  headerContent?: React.ReactNode;
}
