import React from 'react';

import { DarkModeProps } from '@leafygreen-ui/lib';
import { BaseFontSize } from '@leafygreen-ui/tokens';

export interface PageLoaderProps
  extends DarkModeProps,
    React.ComponentProps<'div'> {
  /**
   * Description text
   */
  description?: string;

  /**
   * The base font size of the description text.
   */
  baseFontSize?: BaseFontSize;
}
