import { DarkModeProps, HTMLElementProps } from '@leafygreen-ui/lib';
import { Header } from '@tanstack/react-table';

export type Align = HTMLElementProps<'td'>['align'];

export const SortState = {
  Ascending: 'asc',
  Descending: 'desc',
  Off: 'off',
};

export type SortState = typeof SortState[keyof typeof SortState];

export interface HeaderCellProps extends HTMLElementProps<'th'>, DarkModeProps {
  sortState?: SortState;
  onSortIconClick?: (newSortState: SortState) => void;
  cellIndex?: number;
  columnName: string;
}
