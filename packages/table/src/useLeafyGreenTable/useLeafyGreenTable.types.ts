import { RefObject } from 'react';
import { VirtualItem } from 'react-virtual';
import { Cell, Row, RowData, Table, TableOptions } from '@tanstack/react-table';

import { HTMLElementProps } from '@leafygreen-ui/lib';

import { ColumnDef } from '..';

import { VirtualizerValues } from './reactVirtual.types';

/** LeafyGreen extension of `useReactTable` {@link RowData}*/
export type LGRowData = RowData; //{
// [key: string]: any;
// };

export type LGTableDataType<T extends LGRowData> = T & {
  renderExpandedContent?: (row: LeafyGreenTableRow<T>) => JSX.Element;
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
export interface LeafyGreenTableOptions<T extends LGRowData, VS extends boolean>
  extends TableOptions<LGTableDataType<T>> {
  containerRef: RefObject<HTMLDivElement>;
  hasSelectableRows?: boolean;
  useVirtualScrolling?: VS;
  columns: Array<LGColumnDef<T>>;
}

/** LeafyGreen extension of `useReactTable` {@link Table}*/
interface LeafyGreenTableValuesWithoutVS<T extends LGRowData>
  extends Table<LGTableDataType<T>> {
  hasSelectableRows: boolean;
}

interface LeafyGreenTableValuesWithVS<T extends LGRowData>
  extends LeafyGreenTableValuesWithoutVS<T>,
    Pick<VirtualizerValues, 'totalSize'> {
  virtualRows: Array<VirtualItem>;
}

export type LeafyGreenTableValues<
  T extends LGRowData,
  VS extends boolean,
> = VS extends true
  ? LeafyGreenTableValuesWithVS<T>
  : LeafyGreenTableValuesWithoutVS<T>;

export type LeafyGreenTable<T extends LGRowData> =
  | LeafyGreenTableValuesWithVS<T>
  | LeafyGreenTableValuesWithoutVS<T>;
