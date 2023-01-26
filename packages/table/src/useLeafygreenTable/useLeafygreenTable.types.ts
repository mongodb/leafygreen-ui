import { RefObject } from 'react';
import { VirtualItem } from 'react-virtual';
import { Cell, Row, Table, TableOptions } from '@tanstack/react-table';

// Below is copied from react-virtual as their types are exported

type ScrollAlignment = 'start' | 'center' | 'end' | 'auto';

interface ScrollToOptions {
  align: ScrollAlignment;
}

interface ScrollToOffsetOptions extends ScrollToOptions {}
interface ScrollToIndexOptions extends ScrollToOptions {}

export interface VirtualizerValues {
  virtualItems: Array<VirtualItem>;
  totalSize: number;
  scrollToOffset: (index: number, options?: ScrollToOffsetOptions) => void;
  scrollToIndex: (index: number, options?: ScrollToIndexOptions) => void;
  measure: () => void;
}

// Above is copied from react-virtual as their types are not exported

export type LeafygreenTableType<T extends unknown> = T & {
  renderExpandedContent?: (row: Row<T>) => JSX.Element;
};

export type LeafygreenTableCell<T extends unknown> = unknown &
  Cell<LeafygreenTableType<T>, unknown>;

export type LeafygreenTableRow<T extends unknown> = unknown &
  Row<LeafygreenTableType<T>>;

export interface LeafygreenTableOptions<T extends unknown>
  extends TableOptions<LeafygreenTableType<T>> {
  containerRef: RefObject<HTMLDivElement>;
  hasSelectableRows?: boolean;
  useVirtualScrolling?: boolean;
}

interface LeafygreenTableValuesWithoutVS<T extends unknown>
  extends Table<LeafygreenTableType<T>> {}

interface LeafygreenTableValuesWithVS<T>
  extends LeafygreenTableValuesWithoutVS<T>,
    Pick<VirtualizerValues, 'totalSize'> {
  virtualRows: Array<VirtualItem>;
}

export type LeafygreenTableValues<T, VS extends boolean> = VS extends true
  ? LeafygreenTableValuesWithVS<T>
  : LeafygreenTableValuesWithoutVS<T>;

export type LeafygreenTable<T extends unknown> =
  | LeafygreenTableValuesWithVS<T>
  | LeafygreenTableValuesWithoutVS<T>;
