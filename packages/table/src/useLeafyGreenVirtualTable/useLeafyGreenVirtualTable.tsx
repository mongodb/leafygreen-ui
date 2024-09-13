import { useVirtual } from 'react-virtual';

import useLeafyGreenTable, {
  LeafyGreenTable,
  LeafyGreenTableOptions,
  LGRowData,
} from '../useLeafyGreenTable';

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
}: LeafyGreenTableOptions<T, V>): LeafyGreenTable<T> {
  const table = useLeafyGreenTable({
    containerRef,
    data,
    columns,
    withPagination,
    allowSelectAll,
    ...rest,
  });

  const { rows } = table.getRowModel();
  const _rowVirtualizer = useVirtual({
    parentRef: containerRef,
    size: rows.length,
    overscan: 30,
    ...virtualizerOptions,
  });

  return {
    ...table,
    virtualRows: _rowVirtualizer.virtualItems,
    totalSize: _rowVirtualizer.totalSize,
    scrollToIndex: _rowVirtualizer.scrollToIndex,
    hasSelectableRows,
  } as LeafyGreenTable<T>;
}

export default useLeafyGreenVirtualTable;
