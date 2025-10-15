import { ComponentPropsWithRef } from 'react';

import { DarkModeProps } from '@leafygreen-ui/lib';

export interface ExpandableGridProps
  extends ComponentPropsWithRef<'div'>,
    DarkModeProps {
  /**
   * Determines the maximum number of columns the grid should allow
   * @default 3
   */
  maxColumns?: 2 | 3 | 4;
}
