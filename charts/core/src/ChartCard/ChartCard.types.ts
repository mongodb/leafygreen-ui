import { MouseEventHandler } from 'react';

import { BaseHeaderProps } from '../BaseHeader';

export interface ChartCardProps
  extends Omit<
    BaseHeaderProps,
    'titleProps' | 'collapsedButtonProps' | 'title'
  > {
  /**
   * The title of the card
   */
  title: string;

  /**
   * Defines the default state of the card
   */
  defaultOpen?: boolean;

  /**
   * Forces the card state
   */
  isOpen?: boolean;

  /**
   * Callback fired when user clicks the toggle button
   */
  onToggleButtonClick?: MouseEventHandler<HTMLButtonElement>;
}
