import React from 'react';

import { DarkModeProps } from '@leafygreen-ui/lib';
import { BaseMenuOptionProps } from '@leafygreen-ui/menu-option';

export type SearchResultProps = DarkModeProps &
  Omit<BaseMenuOptionProps, 'showWedge' | 'active' | 'isInteractive'> & {
    /**
     * The value of the result
     */
    children: React.ReactNode;

    /**
     * Optional description text
     */
    description?: React.ReactNode;

    /**
     * Callback fired when the option is clicked
     */
    onClick?: React.MouseEventHandler;
  };
