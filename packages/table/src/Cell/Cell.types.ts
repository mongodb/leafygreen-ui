import { HTMLElementProps } from '@leafygreen-ui/lib';

import ToggleExpandedIconProps from '../ToggleExpandedIcon/ToggleExpandedIcon.types';
import { LeafyGreenTableCell, LGRowData } from '../useLeafygreenTable';

export type CellProps<T extends LGRowData> = HTMLElementProps<'td'> & {
  /**
   * Index of the cell in its parent row.
   */
  cellIndex?: number;
  /**
   * Depth of nesting its parent row has.
   */
  depth?: number;
  /**
   * Props passed to the ToggleExpandedIcon
   */
  toggleExpandedIconProps?: ToggleExpandedIconProps;
  /**
   * `Cell` object returned from the `useLeafygreenTable` hook
   */
  cell?: LeafyGreenTableCell<T>;
  /**
   * `className` prop passed to the div inside the td that houses the cell's contents
   *
   * Mainly intended for internal use.
   */
  contentClassName?: string;
};
