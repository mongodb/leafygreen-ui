import React from 'react';

import { ActionType, BaseInputOptionProps } from '@leafygreen-ui/input-option';
import { DarkModeProps } from '@leafygreen-ui/lib';
import {
  InferredPolymorphicPropsWithRef,
  PolymorphicAs,
} from '@leafygreen-ui/polymorphic';

export type BaseSearchResultProps = DarkModeProps &
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

export type SearchResultProps<T extends PolymorphicAs> =
  InferredPolymorphicPropsWithRef<T, BaseSearchResultProps> & {
    actionType: ActionType;
  };
