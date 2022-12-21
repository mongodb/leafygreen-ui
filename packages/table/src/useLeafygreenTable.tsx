import { TableOptions, useReactTable } from '@tanstack/react-table';
import { useVirtual } from 'react-virtual';

const useLeafygreenTable = <T extends unknown>(
  props: TableOptions<T> & { containerRef: any },
) => {
  const { containerRef, ...rest } = props;
  const table = useReactTable<T>(rest);
  const { rows } = table.getRowModel();

  //Virtualizing is optional, but might be necessary if we are going to potentially have hundreds or thousands of rows
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
