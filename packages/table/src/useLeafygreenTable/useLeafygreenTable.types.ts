import { Row, Table, TableOptions } from '@tanstack/react-table';
import { VirtualItem } from 'react-virtual';

// Below is copied from react-virtual as their types are exported

type ScrollAlignment = 'start' | 'center' | 'end' | 'auto';

interface ScrollToOptions {
  align: ScrollAlignment;
}

interface ScrollToOffsetOptions extends ScrollToOptions {}
interface ScrollToIndexOptions extends ScrollToOptions {}

interface VirtualizerValues {
  virtualItems: Array<VirtualItem>;
  totalSize: number;
  scrollToOffset: (index: number, options?: ScrollToOffsetOptions) => void;
  scrollToIndex: (index: number, options?: ScrollToIndexOptions) => void;
  measure: () => void;
}

// Above is copied from react-virtual as their types are exported

export type LeafygreenTableRowData<T extends unknown> = T & {
  renderExpandedContent?: (row: Row<T>) => JSX.Element;
};

export type LeafygreenTableOptions<T> = TableOptions<
  LeafygreenTableRowData<T>
> & {
  containerRef: any;
  hasSelectableRows?: boolean;
  useVirtualScrolling?: boolean;
};

export type LeafygreenTableValues<T> = Table<LeafygreenTableRowData<T>> &
  Pick<VirtualizerValues, 'totalSize'> & {
    virtualRows?: Array<VirtualItem>;
  };
