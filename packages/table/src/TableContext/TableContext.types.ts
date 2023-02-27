import { PropsWithChildren } from 'react';

import { TableProps } from '../Table/Table.types';

export type ColumnAlignment = 'left' | 'right' | 'center';

export type TableContextValues = PropsWithChildren<
  Pick<TableProps, 'darkMode' | 'shouldAlternateRowColor'>
> & {
  columnAlignments: Array<ColumnAlignment>;
  setColumnAlignments: React.Dispatch<
    React.SetStateAction<Record<number, ColumnAlignment> | undefined>
  >;
  internalExpandedRows: Array<Record<string, boolean>>;
  setInternalExpandedRows: React.Dispatch<
    React.SetStateAction<Record<string, boolean> | undefined>
  >;
  isExpandedRow: (rowId: string) => boolean;
  toggleExpandedRow: (rowId: string) => void;
};
