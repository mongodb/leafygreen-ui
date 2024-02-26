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
   * Opitional resource name that will copy to the clipboard when clicked
   */
  resourceName?: string;

  /**
   * Optional icon that will render to the left of the resource name
   */
  resourceIcon?: ReactNode;

  /**
   * Optional buttons that will render to the right of the resource name
   */
  actions?: ReactNode;

  /**
   * Optional link that will render above the page title.
   */
  backLink?: ReactNode;
}
