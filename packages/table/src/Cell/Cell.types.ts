import { HTMLElementProps } from '@leafygreen-ui/lib';

import ToggleExpandedIconProps from '../ToggleExpandedIcon/ToggleExpandedIcon.types';
import { LeafygreenTableCell } from '../useLeafygreenTable';

export interface InternalCellBaseProps extends HTMLElementProps<'td'> {
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
  cell: LeafygreenTableCell<T>;
}

export type CellProps<T extends unknown> = HTMLElementProps<'td'> &
  Partial<Pick<InternalCellWithRTProps<T>, 'cell'>>;
