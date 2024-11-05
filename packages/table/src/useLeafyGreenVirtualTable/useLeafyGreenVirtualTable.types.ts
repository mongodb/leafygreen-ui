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
  /**
   * A ref to the <div> wrapping <table>
   */
  containerRef: RefObject<HTMLElement>;

  /**
   * A list of [options](https://tanstack.com/virtual/latest/docs/api/virtualizer) to pass to the virtualizer instance
   */
  virtualizerOptions?: Partial<VirtualizerOptions<HTMLElement, Element>>;
}

/**
 * LeafyGreen extension of `useReactTable` {@link Table}
 */
export interface LeafyGreenVirtualTable<T extends LGRowData>
  extends LeafyGreenTable<T> {
  /**
   * Available [properties and methods](https://tanstack.com/virtual/latest/docs/api/virtualizer#virtualizer-instance) return from the Virtualizer instance.
   */
  virtual: Omit<Virtualizer<HTMLElement, Element>, 'getVirtualItems'> & {
    getVirtualItems: () => Array<LeafyGreenVirtualItem<T>>;
  };
}

export type LeafyGreenVirtualItem<T extends LGRowData> = TSVirtualItem & {
  /**
   * The row associated with the virtualItem
   */
  row: LeafyGreenTableRow<T>;
};
