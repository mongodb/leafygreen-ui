import { DarkModeProps, HTMLElementProps } from '@leafygreen-ui/lib';
import { Cell } from '@tanstack/table-core';
import ToggleExpandedIconProps from '../ToggleExpandedIcon/ToggleExpandedIcon.types';

export interface InternalCellBaseProps extends HTMLElementProps<'td'>, DarkModeProps {
  cellIndex: number;
  depth?: number;
  shouldRenderArrow: boolean;
  toggleExpandedIconProps: ToggleExpandedIconProps;
}

export interface InternalCellWithVSProps<T extends unknown> extends Partial<InternalCellBaseProps> {
  cellIndex: number;
  cell: Cell<T, any>;
}

export interface InternalCellWithoutVSProps extends Partial<InternalCellBaseProps> {
}

export type CellProps<T extends unknown> = Partial<InternalCellWithVSProps<T>> | InternalCellWithoutVSProps;