import { ReactNode } from 'react';

import { CardProps } from '@leafygreen-ui/card';
import { DarkModeProps } from '@leafygreen-ui/lib';

/**
 * Types
 */
export interface ExpandableCardProps
  extends Omit<CardProps, 'contentStyle'>,
    DarkModeProps {
  /**
   * The title of the card
   */
  title: string;

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
