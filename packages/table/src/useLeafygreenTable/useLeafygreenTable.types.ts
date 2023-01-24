import { Row, Table, TableOptions } from '@tanstack/react-table';
import { VirtualItem } from 'react-virtual';

// Below is copied from react-virtual as their types are exported

type ScrollAlignment = 'start' | 'center' | 'end' | 'auto';

interface ScrollToOptions {
  align: ScrollAlignment;
}

interface ScrollToOffsetOptions extends ScrollToOptions { }
interface ScrollToIndexOptions extends ScrollToOptions { }

export interface VirtualizerValues {
  virtualItems: Array<VirtualItem>;
  totalSize: number;
  scrollToOffset: (index: number, options?: ScrollToOffsetOptions) => void;
  scrollToIndex: (index: number, options?: ScrollToIndexOptions) => void;
  measure: () => void;
}

// Above is copied from react-virtual as their types are exported

// Might need to use a recursive deep replace to support the below.
// https://stackoverflow.com/questions/70632026/generic-to-recursively-modify-a-given-type-interface-in-typescript
export type LeafygreenTableType<T extends unknown> = T & {
  renderExpandedContent?: (row: Row<unknown>) => JSX.Element;
};

export type LeafygreenTableRow<T extends unknown> = Row<LeafygreenTableType<T>>;

export interface LeafygreenTableOptions<T extends unknown>
  extends TableOptions<LeafygreenTableType<T>> {
  containerRef: any;
  hasSelectableRows?: boolean;
  useVirtualScrolling?: boolean;
}

interface LeafygreenTableValuesWithoutVS<T extends unknown>
  extends Table<LeafygreenTableType<T>> { }

interface LeafygreenTableValuesWithVS<T>
  extends LeafygreenTableValuesWithoutVS<T>,
  Pick<VirtualizerValues, 'totalSize'> {
  virtualRows: Array<VirtualItem>;
}

export type LeafygreenTableValues<T, VS extends boolean> = VS extends true
  ? LeafygreenTableValuesWithVS<T>
  : LeafygreenTableValuesWithoutVS<T>;

export type LeafygreenTable<T extends unknown> = LeafygreenTableValuesWithVS<T> | LeafygreenTableValuesWithoutVS<T>;
