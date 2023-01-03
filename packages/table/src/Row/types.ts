import { DarkModeProps, HTMLElementProps } from '@leafygreen-ui/lib';
import { Row } from '@tanstack/react-table';
import { VirtualItem } from 'react-virtual';

export interface RowProps<T extends unknown> extends HTMLElementProps<'tr'>, DarkModeProps {
  /**
   * Determines whether or not the row is disabled
   */
  disabled?: boolean;
  row?: Row<T>;
  virtualRow?: VirtualItem;
}