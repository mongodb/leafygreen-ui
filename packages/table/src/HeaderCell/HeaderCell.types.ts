import { DarkModeProps, HTMLElementProps } from '@leafygreen-ui/lib';
import { Header } from '@tanstack/react-table';

export type Align = HTMLElementProps<'td'>['align'];

export const SortState: { [key: string]: string } = {
  Asc: 'asc',
  Desc: 'desc',
  Off: 'off',
  None: 'none',
};

export type SortState = typeof SortState[keyof typeof SortState];

export interface HeaderCellProps<T extends unknown>
  extends HTMLElementProps<'th'>,
    DarkModeProps {
  sortState?: SortState;
  cellIndex?: number;
  header?: Header<T, any>;
}
