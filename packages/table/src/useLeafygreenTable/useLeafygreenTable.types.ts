import { RefObject } from 'react';
import { VirtualItem } from 'react-virtual';
import { Cell, Row, Table, TableOptions } from '@tanstack/react-table';

import { VirtualizerValues } from './reactVirtual.types';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type LGRowData = {
  [key: string]: any;
};

export type LGTableDataType<T extends LGRowData> = T & {
  renderExpandedContent?: (row: LeafygreenTableRow<T>) => JSX.Element;
};

export type LeafygreenTableCell<T extends LGRowData> = Cell<
  LGTableDataType<T>,
  LGRowData
>;

export interface LeafygreenTableRow<T extends LGRowData>
  extends Row<LGTableDataType<T>> {}

export interface LeafygreenTableOptions<T extends LGRowData, VS extends boolean>
  extends TableOptions<LGTableDataType<T>> {
  containerRef: RefObject<HTMLDivElement>;
  hasSelectableRows?: boolean;
  useVirtualScrolling: VS;
}

interface LeafygreenTableValuesWithoutVS<T extends LGRowData>
  extends Table<LGTableDataType<T>> {}

interface LeafygreenTableValuesWithVS<T extends LGRowData>
  extends LeafygreenTableValuesWithoutVS<T>,
    Pick<VirtualizerValues, 'totalSize'> {
  virtualRows: Array<VirtualItem>;
}

export type LeafygreenTableValues<
  T extends LGRowData,
  VS extends boolean,
> = VS extends true
  ? LeafygreenTableValuesWithVS<T>
  : LeafygreenTableValuesWithoutVS<T>;

export type LeafygreenTable<T extends LGRowData> =
  | LeafygreenTableValuesWithVS<T>
  | LeafygreenTableValuesWithoutVS<T>;
