import { HTMLElementProps } from '@leafygreen-ui/lib';

export interface ChartHeaderProps
  extends Omit<HTMLElementProps<'div'>, 'title'> {
  /**
   * The title of the chart
   */
  title: string;

  /**
   * Icon to be rendered directly to the right of the title.
   */
  titleIcon?: React.ReactNode;

  /**
   * Whether to display divider line on top of header.
   */
  showDivider?: boolean;

  /**
   * Content to be rendered to the right of the label.
   */
  headerContent?: React.ReactNode;
}
