import React, { PropsWithChildren } from 'react';

import { HTMLElementProps } from '@leafygreen-ui/lib';

import { BaseHeaderProps } from '../BaseHeader';

export interface ChartCardProps
  extends HTMLElementProps<'div'>,
    PropsWithChildren,
    Omit<BaseHeaderProps, 'labelProps' | 'collapsedButtonProps'> {
  /**
   * Text value of label
   */
  label: string;

  /**
   * Defines the default state of the card
   */
  defaultOpen?: boolean;

  /**
   * Forces the card state
   */
  isOpen?: boolean;

  /**
   * Callback fired when a user clicks the card header
   */
  onClick?: (
    event: React.SyntheticEvent<HTMLDivElement, MouseEvent | KeyboardEvent>,
  ) => void;

  /**
   * Styling prop for children
   */
  contentClassName?: string;
}
