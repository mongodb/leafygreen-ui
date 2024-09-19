import { useVirtualizer } from '@tanstack/react-virtual';

import useLeafyGreenTable, { LGRowData } from '../useLeafyGreenTable';

import {
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
    ...rest,
  });

  const { rows } = table.getRowModel();

  const _virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => containerRef.current,
    estimateSize: () => 40,
    overscan: 20,
    measureElement:
      typeof window !== 'undefined' &&
      navigator.userAgent.indexOf('Firefox') === -1
        ? element => element?.getBoundingClientRect().height
        : undefined,
    ...virtualizerOptions,
  });

  return {
    ...table,
    virtual: { ..._virtualizer },
  } as LeafyGreenVirtualTable<T>;
}

export default useLeafyGreenVirtualTable;
