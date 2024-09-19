import { RefObject } from 'react';
import {
  // VirtualItem,
  Virtualizer,
  VirtualizerOptions,
} from '@tanstack/react-virtual';

import {
  LeafyGreenTable,
  LeafyGreenTableOptions,
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
  virtual: Omit<Virtualizer<HTMLElement, Element>, 'virtualItems'>;
}
