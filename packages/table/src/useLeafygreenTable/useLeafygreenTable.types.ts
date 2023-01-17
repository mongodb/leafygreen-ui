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

interface LeafygreenTableOptionsWithoutVS<T> extends TableOptions<LeafygreenTableType<T>> {
  containerRef: any;
  hasSelectableRows?: boolean;
};

interface LeafygreenTableOptionsWithVS<T> extends LeafygreenTableOptionsWithoutVS<T> {
  useVirtualScrolling: boolean;
}

export type LeafygreenTableOptions<T> = LeafygreenTableOptionsWithoutVS<T> | LeafygreenTableOptionsWithVS<T>;

interface LeafygreenTableValuesWithoutVS<T extends unknown> extends Table<LeafygreenTableType<T>> { }

interface LeafygreenTableValuesWithVS<T> extends LeafygreenTableValuesWithoutVS<T>, Pick<VirtualizerValues, 'totalSize'> {
  virtualRows: Array<VirtualItem>;
};

export type LeafygreenTableValues<T> = LeafygreenTableValuesWithoutVS<T> | LeafygreenTableValuesWithVS<T>;

export type LeafygreenTable = LeafygreenTableValues<unknown>;