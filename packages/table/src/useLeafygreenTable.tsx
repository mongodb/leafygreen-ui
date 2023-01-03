import { TableOptions, useReactTable } from '@tanstack/react-table';
import { useVirtual } from 'react-virtual';
import { Row } from '@tanstack/react-table';

const useLeafygreenTable = <T extends unknown & { renderExpandedContent: (row: Row<T>) => JSX.Element }>(
  props: TableOptions<T> & { containerRef: any },
) => {
  const { containerRef, ...rest } = props;
  const table = useReactTable<T>(rest);
  const { rows } = table.getRowModel();
  const rowVirtualizer = useVirtual({
    parentRef: containerRef,
    size: rows.length,
  });
  const { virtualItems: virtualRows, totalSize } = rowVirtualizer;
  return {
    ...table,
    virtualRows,
    totalSize,
  };
};

export default useLeafygreenTable;
