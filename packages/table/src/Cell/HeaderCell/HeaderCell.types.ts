import { HTMLElementProps } from '@leafygreen-ui/lib';

import { Header } from '../..';
import { LGRowData } from '../../useLeafyGreenTable';

export type Align = HTMLElementProps<'td'>['align'];

export const SortState: { [key: string]: string } = {
  Asc: 'asc',
  Desc: 'desc',
  Off: 'off',
  None: 'none',
};

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
