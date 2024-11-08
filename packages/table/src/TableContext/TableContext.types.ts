import { PropsWithChildren } from 'react';
import { Virtualizer } from '@tanstack/react-virtual';

import { DarkModeProps } from '@leafygreen-ui/lib';

import { TableProps } from '../Table/Table.types';
import { LeafyGreenTable, LGRowData } from '../useLeafyGreenTable';
import { LeafyGreenVirtualItem } from '../useLeafyGreenVirtualTable';

export interface SharedVirtualContextValue<T extends LGRowData> {
  /**
   * Available [properties and methods](https://tanstack.com/virtual/latest/docs/api/virtualizer#virtualizer-instance) return from the Virtualizer instance.
   */
  virtualTable?: Omit<Virtualizer<HTMLElement, Element>, 'getVirtualItems'> & {
    getVirtualItems: () => Array<LeafyGreenVirtualItem<T>>;
  };
}

export interface BaseTableContextValue<T extends LGRowData> {
  /**
   * The `useLeafyGreenTable` return value
   */
  table?: LeafyGreenTable<T>;

  /**
   * Whether the table is using virtual scrolling
   */
  isVirtual?: boolean;

  /**
   * Whether rows in the table are selectable
   */
  isSelectable?: boolean;
}

export type TableProviderValues<T extends LGRowData> = PropsWithChildren<
  Pick<
    TableProps<T>,
    'shouldAlternateRowColor' | 'shouldTruncate' | 'verticalAlignment'
  >
> &
  DarkModeProps &
  SharedVirtualContextValue<T> &
  BaseTableContextValue<T>;

export type TableContextValues<T extends LGRowData> = PropsWithChildren<
  // TODO: this is repeated above
  Pick<
    TableProps<T>,
    'shouldAlternateRowColor' | 'shouldTruncate' | 'verticalAlignment'
  >
> &
  DarkModeProps &
  BaseTableContextValue<T>;

export type VirtualTableContextValues<T extends LGRowData> = PropsWithChildren &
  SharedVirtualContextValue<T>;
