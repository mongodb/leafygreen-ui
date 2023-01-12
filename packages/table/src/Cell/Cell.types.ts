import { DarkModeProps, HTMLElementProps } from '@leafygreen-ui/lib';
import { Cell } from '@tanstack/table-core';
import ToggleExpandedIconProps from '../ToggleExpandedIcon/ToggleExpandedIcon.types';

export interface InternalCellBaseProps
  extends HTMLElementProps<'td'>,
  DarkModeProps {
  cellIndex: number;
  depth?: number;
  toggleExpandedIconProps?: ToggleExpandedIconProps;
}

export interface InternalCellWithRTProps<T extends unknown>
  extends InternalCellBaseProps {
  cell: Cell<T, any>;
}

export type CellProps<T extends unknown> =
  HTMLElementProps<'td'> &
  Partial<Pick<InternalCellWithRTProps<T>, 'cell'>>;
