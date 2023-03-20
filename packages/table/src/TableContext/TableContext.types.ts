import { PropsWithChildren } from 'react';

import { TableProps } from '../Table/Table.types';
import {
  LeafyGreenTableRow,
  LeafyGreenTableValues,
  LGRowData,
} from '../useLeafyGreenTable';

export type ColumnAlignment = 'left' | 'right' | 'center';

export type TableContextValues<
  T extends LGRowData,
  VS extends boolean,
> = PropsWithChildren<
  Pick<TableProps<T, VS>, 'table' | 'darkMode' | 'shouldAlternateRowColor'>
> & {
  /**
   * The horizontal alignment of all cells in each column
   */
  columnAlignments?: Array<ColumnAlignment>;
  setColumnAlignments?: React.Dispatch<
    React.SetStateAction<Array<ColumnAlignment> | undefined>
  >;

  /** returns the table row object with the provided `id` */
  getRowById?: (id?: string) => LeafyGreenTableRow<T> | undefined;

  /** returns the parent table row object for the provided `id` if it is nested */
  getParentRow?: (id?: string) => LeafyGreenTableRow<T> | undefined;

  /**
   * The `useLeafyGreenTable` return value
   */
  table?: LeafyGreenTableValues<T, VS>;
};

export const initialTableContext: TableContextValues<LGRowData, boolean> = {
  getRowById: (_?: string) => undefined,
  getParentRow: (_?: string) => undefined,
};
