import { PropsWithChildren } from 'react';

import { DarkModeProps } from '@leafygreen-ui/lib';

import { TableProps } from '../Table/Table.types';
import { LGRowData } from '../useLeafyGreenTable';
import { LeafyGreenVirtualTable } from '../useLeafyGreenVirtualTable';
import { GetLgIdsReturnType } from '../utils';

interface BaseTableContextValue<T extends LGRowData> {
  /**
   * Whether the table is using virtual scrolling
   */
  isVirtual?: boolean;

  /**
   * Whether rows in the table are selectable
   */
  isSelectable?: boolean;

  /**
   * Available [properties and methods](https://tanstack.com/virtual/latest/docs/api/virtualizer#virtualizer-instance) returned from the Virtualizer instance.
   */
  virtualTable?: LeafyGreenVirtualTable<T>['virtual'];

  /**
   * LGIDs for table components
   */
  lgIds: GetLgIdsReturnType;
}

type PartialTableProps<T extends LGRowData> = Pick<
  TableProps<T>,
  'shouldAlternateRowColor' | 'shouldTruncate' | 'verticalAlignment'
>;

export type TableProviderProps<T extends LGRowData> = PropsWithChildren<
  PartialTableProps<T>
> &
  DarkModeProps &
  BaseTableContextValue<T>;
