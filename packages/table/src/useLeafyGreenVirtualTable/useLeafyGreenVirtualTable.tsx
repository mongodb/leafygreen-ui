import { useCallback } from 'react';
import { useVirtualizer, VirtualItem } from '@tanstack/react-virtual';

import useLeafyGreenTable, { LGRowData } from '../useLeafyGreenTable';

import {
  LeafyGreenVirtualItem,
  LeafyGreenVirtualTable,
  LeafyGreenVirtualTableOptions,
} from './useLeafyGreenVirtualTable.types';

function useLeafyGreenVirtualTable<
  T extends LGRowData,
  V extends unknown = unknown,
>({
  containerRef,
  data,
  columns,
  hasSelectableRows,
  withPagination = false,
  allowSelectAll = true,
  virtualizerOptions,
  ...rest
}: LeafyGreenVirtualTableOptions<T, V>): LeafyGreenVirtualTable<T> {
  const table = useLeafyGreenTable({
    data,
    columns,
    withPagination,
    allowSelectAll,
    hasSelectableRows,
    ...rest,
  });

  const { rows } = table;

  const _virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => containerRef.current,
    estimateSize: () => 40,
    overscan: 20,
    getItemKey: useCallback(
      (index: number) => rows[index]?.id ?? index,
      [rows],
    ),
    ...virtualizerOptions,
  });

  const _virtualItems: Array<LeafyGreenVirtualItem<T>> = _virtualizer
    .getVirtualItems()
    .map((virtualRow: VirtualItem) => ({
      ...virtualRow,
      row: rows[virtualRow.index],
    }));

  return {
    ...table,
    virtual: { ..._virtualizer, virtualItems: _virtualItems },
  } as LeafyGreenVirtualTable<T>;
}

export default useLeafyGreenVirtualTable;
