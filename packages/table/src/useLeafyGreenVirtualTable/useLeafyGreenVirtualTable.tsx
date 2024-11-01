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
    // measureElement: (element, entry, instance) => {
    //   const direction = instance.scrollDirection
    //   if (direction === "forward" || direction === null) {
    //     return element.scrollHeight
    //   } else {
    //     // don't remeasure if we are scrolling up
    //     const indexKey = Number(element.getAttribute("data-index"))
    //     let cacheMeasurement = instance.itemSizeCache.get(indexKey)
    //     return cacheMeasurement
    //   }
    // }
    // measureElement:
    //   typeof window !== 'undefined' &&
    //   navigator.userAgent.indexOf('Firefox') === -1
    //     ? element => element?.getBoundingClientRect().height
    //     : undefined,
    // onChange: (i, s) => console.log('🪼', { s, i }),
    // isScrollingResetDelay: 1000,
    // debug: true,
    ...virtualizerOptions,
  });

  // Kill the cache entirely to prevent weird scrolling issues. This is a hack
  // _virtualizer.measurementsCache = [];

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
