import React from 'react';
import { DarkModeProps } from '@leafygreen-ui/lib';
import { BaseInputOptionProps } from '@leafygreen-ui/internal-input-option';

export type SearchResultProps =
  DarkModeProps &
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
