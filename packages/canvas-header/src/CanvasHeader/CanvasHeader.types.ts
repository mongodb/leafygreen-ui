import { ReactNode } from 'react';

import { DarkModeProps, HTMLElementProps } from '@leafygreen-ui/lib';

export interface CanvasHeaderProps
  extends DarkModeProps,
    Omit<HTMLElementProps<'div'>, 'children'> {
  /**
   * Required page title
   */
  pageTitle: string;

  /**
   * Optional buttons that will render to the right of the badges or resource name
   */
  actions?: ReactNode;

  /**
   * Optional link that will render above the page title.
   */
  backLink?: ReactNode;

  /**
   * Optional badges that will render to the right of the page title
   */
  badges?: ReactNode;

  /**
   * Optional resource name that will copy to the clipboard when clicked
   */
  resourceName?: string;

  /**
   * Optional icon that will render to the left of the resource name
   */
  resourceIcon?: ReactNode;

  /**
   * Optional badges that will render to the right of the resource name
   */
  resourceBadges?: ReactNode;
}
