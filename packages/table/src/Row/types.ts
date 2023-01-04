import { DarkModeProps, HTMLElementProps } from '@leafygreen-ui/lib';
import { Row } from '@tanstack/react-table';
import { VirtualItem } from 'react-virtual';

export interface InternalRowBaseProps extends HTMLElementProps<'tr'>, DarkModeProps {
  /**
   * Determines whether or not the row is disabled
   */
  disabled?: boolean;
}

export interface InternalRowWithoutVSProps extends InternalRowBaseProps { };

export interface InternalRowWithVSProps<T extends unknown> extends InternalRowBaseProps {
  row: Row<T>;
  virtualRow: VirtualItem;
}

export interface RowProps<T extends unknown> extends InternalRowWithoutVSProps, InternalRowWithVSProps<T> { }