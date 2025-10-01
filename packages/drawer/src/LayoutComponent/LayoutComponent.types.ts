import React from 'react';

import { DarkModeProps } from '@leafygreen-ui/lib';

export interface LayoutComponentProps
  extends DarkModeProps,
    Omit<React.ComponentPropsWithoutRef<'div'>, 'children'> {
  /**
   * Slot prop for the content that should render in the drawer column.
   */
  panelContent?: React.ReactNode;

  /**
   * The content to be rendered in the content column.
   */
  children: React.ReactNode;
}
