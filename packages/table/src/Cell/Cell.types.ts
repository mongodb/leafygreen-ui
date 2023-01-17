import { DarkModeProps, HTMLElementProps } from '@leafygreen-ui/lib';
import { Cell } from '@tanstack/table-core';
import ToggleExpandedIconProps from '../ToggleExpandedIcon/ToggleExpandedIcon.types';

export interface InternalCellBaseProps
  extends HTMLElementProps<'td'>,
  DarkModeProps {
  /**
   * Index of the cell in its parent row.
   */
  cellIndex: number;
  /**
   * Depth of nesting its parent row has.
   */
  depth?: number;
  /**
   * Props passed to the ToggleExpandedIcon
   */
  toggleExpandedIconProps?: ToggleExpandedIconProps;
}

export interface InternalCellWithRTProps<T extends unknown>
  extends InternalCellBaseProps {
  /**
   * `Cell` object returned from the `useLeafygreenTable` hook
   */
  cell: Cell<T, any>;
}

export type CellProps<T extends unknown> =
  HTMLElementProps<'td'> &
  Partial<Pick<InternalCellWithRTProps<T>, 'cell'>>;
