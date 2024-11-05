import {
  Cell,
  ColumnDef,
  Row,
  RowData,
  Table,
  TableOptions,
} from '@tanstack/react-table';

import { HTMLElementProps } from '@leafygreen-ui/lib';

/** LeafyGreen extension of `useReactTable` {@link RowData}*/
export type LGRowData = RowData;

export type LGTableDataType<T extends LGRowData> = T & {
  renderExpandedContent?: (row: LeafyGreenTableRow<T>) => JSX.Element;
  subRows?: Array<LGTableDataType<T>>;
};

export type LGRow<T extends LGRowData> = Row<LGTableDataType<T>> & {
  isExpandedContent?: boolean;
};

/** LeafyGreen extension of `useReactTable` {@link Cell}*/
export type LeafyGreenTableCell<T extends LGRowData> = Cell<
  LGTableDataType<T>,
  unknown
>;

/** LeafyGreen extension of `useReactTable` {@link Row}*/
export interface LeafyGreenTableRow<T extends LGRowData>
  extends LGRow<LGTableDataType<T>> {}

export type LGColumnDef<
  T extends LGRowData,
  V extends unknown = unknown,
> = ColumnDef<LGTableDataType<T>, V> & {
  align?: HTMLElementProps<'td'>['align'];
};

/**
 * Options argument for the LeafyGreen extension of `useReactTable`
 *
 * See: {@link TableOptions}
 */
export type LeafyGreenTableOptions<
  T extends LGRowData,
  V extends unknown = unknown,
> = Omit<TableOptions<LGTableDataType<T>>, 'getCoreRowModel' | 'columns'> & {
  hasSelectableRows?: boolean;
  columns: Array<LGColumnDef<T, V>>;
  withPagination?: boolean;
  allowSelectAll?: boolean;
};

/**
 * LeafyGreen extension of `useReactTable` {@link Table}
 */
export interface LeafyGreenTable<T extends LGRowData>
  extends Table<LGTableDataType<T>> {
  hasSelectableRows: boolean;
  rows: Array<any>;
}
