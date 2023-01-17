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
  /**
   * The `align` prop set on a HeaderCell will serve as the default `align` prop on the TableCell corresponding to the HeaderCell's index.
   */
  align?: HTMLElementProps<'th'>['align'];
  /**
   * Determines the current sorting direction.
   */
  sortState?: SortState;
  /**
   * Header object passed from the `useLeafygreenTable` hook.
   */
  header?: Header<T, any>;
  /**
   * Index of the HeaderCell set internally in HeaderRow
   */
  cellIndex?: number;
}
