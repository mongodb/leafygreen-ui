import {
  ComponentPropsWithRef,
  ForwardedRef,
  PropsWithoutRef,
  ReactElement,
  RefAttributes,
  WeakValidationMap,
} from 'react';
import { Header } from '@tanstack/react-table';

import { LGRowData } from '../../useLeafyGreenTable';

export const SortState = {
  Asc: 'asc',
  Desc: 'desc',
  Off: 'off',
  None: 'none',
} as const;

export type SortState = (typeof SortState)[keyof typeof SortState];

export interface SortStates {
  [key: string]: SortState;
}

export interface HeaderCellProps<T extends LGRowData>
  extends ComponentPropsWithRef<'th'> {
  /**
   * The `align` prop set on a HeaderCell will serve as the default `align` prop on the TableCell corresponding to the HeaderCell's index.
   */
  align?: ComponentPropsWithRef<'th'>['align'];
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

export interface HeaderCellComponentType {
  <T extends LGRowData>(
    props: HeaderCellProps<T>,
    ref: ForwardedRef<HTMLTableCellElement>,
  ): ReactElement | null;
  displayName?: string;
  propTypes?:
    | WeakValidationMap<
        PropsWithoutRef<HeaderCellProps<LGRowData> & RefAttributes<any>>
      >
    | undefined;
}
