import React from 'react';

import { BaseInputOptionProps } from '@leafygreen-ui/input-option';
import { DarkModeProps } from '@leafygreen-ui/lib';

export type SearchResultProps = DarkModeProps &
  Omit<BaseInputOptionProps, 'showWedge' | 'active' | 'isInteractive'> & {
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
