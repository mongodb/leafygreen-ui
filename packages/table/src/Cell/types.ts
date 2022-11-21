import { DarkModeProps, HTMLElementProps } from '@leafygreen-ui/lib';

export interface CellProps extends HTMLElementProps<'td'>, DarkModeProps {
  cellIndex?: number;
}
