import { BaseHeaderProps } from '../BaseHeader';

export interface HeaderProps
  extends Omit<BaseHeaderProps, 'labelProps' | 'collapsedButtonProps'> {
  /**
   * Header label.
   */
  label: string;

  /**
   * Whether to display divider line on top of header.
   */
  showDivider?: boolean;
}
