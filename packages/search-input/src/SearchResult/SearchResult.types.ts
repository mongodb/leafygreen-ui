import React from 'react';

import { InputOptionProps } from '@leafygreen-ui/input-option';

export type SearchResultProps = Omit<
  InputOptionProps,
  'showWedge' | 'active' | 'isInteractive'
> & {
  /**
   * Optional description text
   */
  description?: React.ReactNode;

  /**
   * Callback fired when the option is clicked
   */
  onClick?: React.MouseEventHandler;
};
