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
 * Available [options](https://tanstack.com/table/latest/docs/guide/tables#creating-a-table-instance) to pass to the LeafyGreen extension of `useReactTable`.
 */
export interface LeafyGreenVirtualTableOptions<
  T extends LGRowData,
  V extends unknown = unknown,
> extends LeafyGreenTableOptions<T, V> {
  /**
   * A required ref to the <div> wrapping <table>
   */
  containerRef: RefObject<HTMLElement>;

  /**
   * Available [options](https://tanstack.com/virtual/latest/docs/api/virtualizer) to pass to the virtualizer instance
   */
  virtualizerOptions?: Partial<VirtualizerOptions<HTMLElement, Element>>;
}

/**
 * LeafyGreen extension of `useReactTable` {@link Table}
 */
export interface LeafyGreenVirtualTable<T extends LGRowData>
  extends Omit<LeafyGreenTable<T>, 'virtual'> {
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
