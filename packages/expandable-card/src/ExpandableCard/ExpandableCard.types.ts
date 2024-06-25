import React, { ReactNode } from 'react';

import { DarkModeProps, HTMLElementProps } from '@leafygreen-ui/lib';

/**
 * Types
 */
export interface ExpandableCardProps
  extends DarkModeProps,
    Omit<HTMLElementProps<'div'>, 'title'> {
  /**
   * The title of the card
   */
  title: ReactNode;

  /**
   * Description text below the title
   */
  description?: ReactNode;

  /**
   * Text in parentheses immediately following the title. Typically 'optional' or 'required'
   */
  flagText?: 'optional' | 'required' | string;

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
   * Unique id for the card
   */
  id?: string;

  /**
   * Styling prop for children
   */
  contentClassName?: string;

  /**
   * Component children
   */
  children?: React.ReactNode;
}
