import { ComponentPropsWithRef } from 'react';

export interface ActionsProps extends ComponentPropsWithRef<'div'> {
  /**
   * Determines whether to show the toggle button.
   * Only shows if the variant is collapsible.
   * @default false
   */
  showToggleButton?: boolean;

  /**
   * The ID of the element that should be controlled by the toggle button.
   * @default undefined
   */
  ariaControls?: string;
}
