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
  /**
   * Setting this prop will inject a new column containing a checkbox into all rows.
   */
  hasSelectableRows?: boolean;

  /**
   * The column definitions for the table
   */
  columns: Array<LGColumnDef<T, V>>;

  /**
   * Setting this prop will indicate that the Table component is being used with the Pagination component. This will expose various pagination utilities from `table.getState().pagination`.
   */
  withPagination?: boolean;

  /**
   * This prop controls whether a 'select all' checkbox will be rendered in the header row. This will be set to `true` by default.
   */
  allowSelectAll?: boolean;
};

/**
 * LeafyGreen extension of `useReactTable` {@link Table}
 */
export interface LeafyGreenTable<T extends LGRowData>
  extends Table<LGTableDataType<T>> {
  /**
   * Whether the table will have selectable rows.
   */
  hasSelectableRows: boolean;

  /**
   * The rows that are returned from calling useLeafyGreenTable or useLeafyGreenVirtualTable
   */
  rows: Array<any>;
  virtual: never;
}
