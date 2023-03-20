import { PropsWithChildren } from 'react';
import { Row } from '@tanstack/react-table';

import { TableProps } from '../Table/Table.types';
import {
  LeafygreenTableRow,
  LeafygreenTableValues,
  LGRowData,
} from '../useLeafygreenTable';

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

  getRowById?: (id?: string) => LeafygreenTableRow<T> | undefined;
  getParentRow?: (id?: string) => LeafygreenTableRow<T> | undefined;

  /**
   * The `useLeafyGreenTable` return value
   */
  table?: LeafygreenTableValues<T, VS>;

  // internalExpandedRows: Array<Record<string, boolean>>;
  // setInternalExpandedRows: React.Dispatch<
  //   React.SetStateAction<Record<string, boolean> | undefined>
  // >;

  // isExpandedRow: (rowId: string) => boolean;
  // toggleExpandedRow: (rowId: string) => void;
};

export const initialTableContext: TableContextValues<LGRowData, boolean> = {
  getRowById: (_?: string) => undefined,
  getParentRow: (_?: string) => undefined,
};
