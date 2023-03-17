import { PropsWithChildren } from 'react';
import { Row } from '@tanstack/react-table';

import { TableProps } from '../Table/Table.types';

export type ColumnAlignment = 'left' | 'right' | 'center';

export type TableContextValues = PropsWithChildren<
  Pick<TableProps, 'table' | 'darkMode' | 'shouldAlternateRowColor'>
> & {
  /**
   * The horizontal alignment of all cells in each column
   */
  columnAlignments?: Array<ColumnAlignment>;
  setColumnAlignments?: React.Dispatch<
    React.SetStateAction<Array<ColumnAlignment> | undefined>
  >;

  // TODO: any
  getRowById: (id?: string) => Row<any> | undefined;
  getParentRow: (id?: string) => Row<any> | undefined;

  // internalExpandedRows: Array<Record<string, boolean>>;
  // setInternalExpandedRows: React.Dispatch<
  //   React.SetStateAction<Record<string, boolean> | undefined>
  // >;

  // isExpandedRow: (rowId: string) => boolean;
  // toggleExpandedRow: (rowId: string) => void;
};

export const initialTableContext: TableContextValues = {
  getRowById: (_?: string) => undefined,
  getParentRow: (_?: string) => undefined,
};
