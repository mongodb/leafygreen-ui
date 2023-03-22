import { HTMLElementProps } from '@leafygreen-ui/lib';

import { ToggleExpandedIconProps } from '../ToggleExpandedIcon/ToggleExpandedIcon.types';

export type CellProps = HTMLElementProps<'td'> & {
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
   * `className` prop passed to the div inside the td that houses the cell's contents
   *
   * Mainly intended for internal use.
   */
  contentClassName?: string;

  /**
   * Defines whether the cell's row is visible (i.e. expanded)
   *
   * @default true
   */
  isVisible?: boolean;

  /**
   * Defines whether the cell's row is expandable
   *
   * @default false
   */
  isExpandable?: boolean;
};
