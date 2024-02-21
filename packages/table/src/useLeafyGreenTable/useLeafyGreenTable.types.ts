import { RefObject } from 'react';
import {
  type Options as VirtualizerOptions,
  type VirtualItem,
} from 'react-virtual';
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
  containerRef: RefObject<HTMLElement>;
  hasSelectableRows?: boolean;
  columns: Array<LGColumnDef<T, V>>;
  withPagination?: boolean;
  allowSelectAll?: boolean;
  useVirtualScrolling?: boolean;
  virtualizerOptions?: Partial<VirtualizerOptions<HTMLElement>>;
};

/**
 * LeafyGreen extension of `useReactTable` {@link Table}
 */
export interface LeafyGreenTable<T extends LGRowData>
  extends Table<LGTableDataType<T>>,
    Omit<VirtualizerValues, 'virtualItems'> {
  virtualRows?: Array<VirtualItem>;
  hasSelectableRows: boolean;
}
