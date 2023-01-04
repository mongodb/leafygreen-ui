import { Table, TableOptions, useReactTable } from '@tanstack/react-table';
import { useVirtual } from 'react-virtual';
import { Row } from '@tanstack/react-table';

const useLeafygreenTable = <T extends unknown & { renderExpandedContent?: (row: Row<T>) => JSX.Element }>(
  props: TableOptions<T> & { containerRef: any },
) => {
  const { containerRef, data, ...rest } = props;
  const table: Table<T> = useReactTable<T>({
    data,
    getRowCanExpand: (row: Row<T>) => {
      // console.log(!!row.original.renderExpandedContent)
      return !!row.original.renderExpandedContent || ((table.options.enableExpanding ?? true) && !!row.subRows?.length)
    },
    ...rest
  });
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
