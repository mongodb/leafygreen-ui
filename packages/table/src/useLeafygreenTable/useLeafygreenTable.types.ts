import { RefObject } from 'react';
import { VirtualItem } from 'react-virtual';
import { Cell, Row, RowData, Table, TableOptions } from '@tanstack/react-table';

import { VirtualizerValues } from './reactVirtual.types';

export type LGTableDataType<T extends RowData> = T & {
  renderExpandedContent?: (row: LeafygreenTableRow<T>) => JSX.Element;
};

export type LeafygreenTableCell<T extends RowData> = Cell<
  LGTableDataType<T>,
  RowData
>;

export interface LeafygreenTableRow<T extends RowData>
  extends Row<LGTableDataType<T>> {}

export interface LeafygreenTableOptions<T extends RowData, VS extends boolean>
  extends TableOptions<LGTableDataType<T>> {
  containerRef: RefObject<HTMLDivElement>;
  hasSelectableRows?: boolean;
  useVirtualScrolling: VS;
}

interface LeafygreenTableValuesWithoutVS<T extends RowData>
  extends Table<LGTableDataType<T>> {}

interface LeafygreenTableValuesWithVS<T extends RowData>
  extends LeafygreenTableValuesWithoutVS<T>,
    Pick<VirtualizerValues, 'totalSize'> {
  virtualRows: Array<VirtualItem>;
}

export type LeafygreenTableValues<
  T extends unknown,
  VS extends boolean,
> = VS extends true
  ? LeafygreenTableValuesWithVS<T>
  : LeafygreenTableValuesWithoutVS<T>;

export type LeafygreenTable<T extends RowData> =
  | LeafygreenTableValuesWithVS<T>
  | LeafygreenTableValuesWithoutVS<T>;
