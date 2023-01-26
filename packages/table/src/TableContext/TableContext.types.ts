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
};
