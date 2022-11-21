import { DarkModeProps, HTMLElementProps } from '@leafygreen-ui/lib';
import { MouseEventHandler, ReactNode } from 'react';

export interface RowProps extends HTMLElementProps<'tr'>, DarkModeProps {
  /**
   * Determines whether or not the row is disabled
   */
  disabled?: boolean;
}

export interface ClickableRow extends RowProps {
  onClick?: MouseEventHandler<HTMLTableRowElement>;
}
export interface ExpandableRowProps extends RowProps {
  /**
   * Determines whether or not the row is expanded on first render
   */
  expanded?: boolean;
  nestedChildren: ReactNode;
}
