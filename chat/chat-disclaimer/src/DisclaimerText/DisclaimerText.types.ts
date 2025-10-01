import React from 'react';

import { DarkModeProps } from '@leafygreen-ui/lib';

export interface DisclaimerTextProps
  extends DarkModeProps,
    React.ComponentPropsWithoutRef<'div'> {
  /**
   * Heading text
   */
  title?: string;
}
