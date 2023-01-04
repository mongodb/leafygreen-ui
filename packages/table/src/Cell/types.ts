import { DarkModeProps, HTMLElementProps } from '@leafygreen-ui/lib';
import { Cell } from '@tanstack/table-core';
import { WithOptionalProperty } from '../Table/types';
import ToggleExpandedIconProps from '../ToggleExpandedIcon/ToggleExpandedIcon.types';

export interface InternalCellBaseProps extends HTMLElementProps<'td'>, DarkModeProps {
  cellIndex: number;
  depth: number;
  shouldRenderArrow: boolean;
  toggleExpandedIconProps: ToggleExpandedIconProps;
}

export interface InternalCellWithVSProps<T extends unknown>
  extends WithOptionalProperty<Omit<InternalCellBaseProps, 'shouldRenderArrow'>, 'cellIndex' | 'depth'> {
  cell: Cell<T, any>;
}

export interface InternalCellWithoutVSProps extends WithOptionalProperty<InternalCellBaseProps, 'cellIndex' | 'depth'> {
  childIsExpanded?: boolean;
  toggleChildIsExpanded?: () => void;
}

export type CellProps<T extends unknown> = WithOptionalProperty<InternalCellWithVSProps<T>, 'cell'> | InternalCellWithoutVSProps;