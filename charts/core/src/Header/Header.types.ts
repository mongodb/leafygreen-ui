import { BaseHeaderProps } from '../BaseHeader';

export interface HeaderProps
  extends Omit<
    BaseHeaderProps,
    'titleProps' | 'collapsedButtonProps' | 'title'
  > {
  /**
   * The title of the chart
   */
  title: string;

  /**
   * Whether to display divider line on top of header.
   */
  showDivider?: boolean;
}
