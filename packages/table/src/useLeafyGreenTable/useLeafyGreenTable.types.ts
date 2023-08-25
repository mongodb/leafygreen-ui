import { RefObject } from 'react';
import { VirtualItem } from 'react-virtual';
import {
  Cell,
  ColumnDef,
  Row,
  RowData,
  Table,
  TableOptions,
} from '@tanstack/react-table';

import { HTMLElementProps } from '@leafygreen-ui/lib';

import { VirtualizerValues } from './ReactVirtual.types';

/** LeafyGreen extension of `useReactTable` {@link RowData}*/
export type LGRowData = RowData;

export type LGTableDataType<T extends LGRowData> = T & {
  renderExpandedContent?: (row: LeafyGreenTableRow<T>) => JSX.Element;
  subRows?: Array<LGTableDataType<T>>;
};

/** LeafyGreen extension of `useReactTable` {@link Cell}*/
export type LeafyGreenTableCell<T extends LGRowData> = Cell<
  LGTableDataType<T>,
  unknown
>;

/** LeafyGreen extension of `useReactTable` {@link Row}*/
export interface LeafyGreenTableRow<T extends LGRowData>
  extends Row<LGTableDataType<T>> {}

export type LGColumnDef<T extends LGRowData> = ColumnDef<LGTableDataType<T>> & {
  align?: HTMLElementProps<'td'>['align'];
};

/** LeafyGreen extension of `useReactTable` {@link TableOptions}*/
export interface LeafyGreenTableOptions<T extends LGRowData>
  extends Omit<TableOptions<LGTableDataType<T>>, 'getCoreRowModel'> {
  containerRef: RefObject<HTMLDivElement>;
  hasSelectableRows?: boolean;
  useVirtualScrolling?: boolean;
  columns: Array<LGColumnDef<T>>;
  withPagination?: boolean;
}

/** LeafyGreen extension of `useReactTable` {@link Table}*/
export interface LeafyGreenTable<T extends LGRowData>
  extends Table<LGTableDataType<T>>,
    Pick<VirtualizerValues, 'totalSize'> {
  virtualRows?: Array<VirtualItem>;
  hasSelectableRows: boolean;
}
