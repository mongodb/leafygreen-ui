import React from 'react';

import { BaseInputOptionProps } from '@leafygreen-ui/internal-input-option';
import { DarkModeProps } from '@leafygreen-ui/lib';

export type SearchResultProps = DarkModeProps &
  BaseInputOptionProps & {
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
