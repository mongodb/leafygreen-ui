import { RefObject } from 'react';
import {
  VirtualItem as TSVirtualItem,
  Virtualizer,
  VirtualizerOptions,
} from '@tanstack/react-virtual';

import {
  LeafyGreenTable,
  LeafyGreenTableOptions,
  LeafyGreenTableRow,
  LGRowData,
} from '../useLeafyGreenTable';

/**
 * Options argument for the LeafyGreen extension of `useReactTable`
 *
 * See: {@link TableOptions}
 */
export interface LeafyGreenVirtualTableOptions<
  T extends LGRowData,
  V extends unknown = unknown,
> extends LeafyGreenTableOptions<T, V> {
  containerRef: RefObject<HTMLElement>;
  virtualizerOptions?: Partial<VirtualizerOptions<HTMLElement, Element>>;
}

/**
 * LeafyGreen extension of `useReactTable` {@link Table}
 */
export interface LeafyGreenVirtualTable<T extends LGRowData>
  extends LeafyGreenTable<T> {
  // virtualRows?: Array<VirtualItem>;
  virtual: Virtualizer<HTMLElement, Element> & {
    virtualItems: Array<LeafyGreenVirtualItem<T>>;
  };
}

export type LeafyGreenVirtualItem<T extends LGRowData> = TSVirtualItem & {
  row: LeafyGreenTableRow<T>;
};
