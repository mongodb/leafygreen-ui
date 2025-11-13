import React from 'react';

import { DarkModeProps } from '@leafygreen-ui/lib';

export interface TitleBarProps
  extends Omit<React.ComponentPropsWithoutRef<'div'>, 'children'>,
    DarkModeProps {
  /**
   * Badge text rendered to indicate 'Beta' or 'Experimental' flags
   */
  badgeText?: string;

  /**
   * Title text
   */
  title: string;
}
