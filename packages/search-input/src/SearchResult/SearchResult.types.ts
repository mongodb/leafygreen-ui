import React from 'react';
import { AriaLabelProps } from '@leafygreen-ui/a11y';
import { DarkModeProps } from '@leafygreen-ui/lib';
import { InputOptionProps } from '@leafygreen-ui/internal-input-option';

export type SearchResultProps =
  AriaLabelProps & DarkModeProps & InputOptionProps & {

    /**
     * The value of the result
     */
    children: React.ReactNode;

    /**
     * Optional description text
     */
    description?: React.ReactNode

    /**
     * Callback fired when the option is clicked
     */
    onClick?: React.MouseEventHandler
  }