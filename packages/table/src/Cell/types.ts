import { DarkModeProps, HTMLElementProps } from '@leafygreen-ui/lib';
import { Cell } from '@tanstack/table-core';

export interface CellProps<T extends unknown> extends HTMLElementProps<'td'>, DarkModeProps {
  cellIndex?: number;
  cell?: Cell<T, any>;
}
