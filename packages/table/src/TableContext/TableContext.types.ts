import { PropsWithChildren } from 'react';
import { Virtualizer } from '@tanstack/react-virtual';

import { DarkModeProps } from '@leafygreen-ui/lib';

import { TableProps } from '../Table/Table.types';
import { LeafyGreenTable, LGRowData } from '../useLeafyGreenTable';

export interface SharedVirtualContextValue {
  /**
   * Available [properties and methods](https://tanstack.com/virtual/latest/docs/api/virtualizer#virtualizer-instance) return from the Virtualizer instance.
   */
  virtualTable?: Virtualizer<HTMLElement, Element>;
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
  Pick<TableProps<T>, 'shouldAlternateRowColor' | 'shouldTruncate'>
> &
  DarkModeProps &
  SharedVirtualContextValue &
  BaseTableContextValue<T>;

export type TableContextValues<T extends LGRowData> = PropsWithChildren<
  Pick<TableProps<T>, 'shouldAlternateRowColor' | 'shouldTruncate'>
> &
  DarkModeProps &
  BaseTableContextValue<T>;

export type VirtualTableContextValues = PropsWithChildren &
  SharedVirtualContextValue;
