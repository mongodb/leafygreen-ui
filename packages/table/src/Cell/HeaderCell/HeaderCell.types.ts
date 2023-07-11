import { Header } from '@tanstack/react-table';

import { HTMLElementProps } from '@leafygreen-ui/lib';

import { LGRowData } from '../../useLeafyGreenTable';

export const SortState = {
  Asc: 'asc',
  Desc: 'desc',
  Off: 'off',
  None: 'none',
} as const;

export type SortState = typeof SortState[keyof typeof SortState];

export interface SortStates {
  [key: string]: SortState;
}

export interface HeaderCellProps<T extends LGRowData>
  extends HTMLElementProps<'th'> {
  /**
   * The `align` prop set on a HeaderCell will serve as the default `align` prop on the TableCell corresponding to the HeaderCell's index.
   */
  align?: HTMLElementProps<'th'>['align'];
  /**
   * Determines the current sorting direction.
   */
  sortState?: SortState;
  /**
   * Header object passed from the `useLeafyGreenTable` hook.
   */
  header?: Header<T, unknown>;
  /**
   * Index of the HeaderCell set internally in HeaderRow
   */
  cellIndex?: number;
}
