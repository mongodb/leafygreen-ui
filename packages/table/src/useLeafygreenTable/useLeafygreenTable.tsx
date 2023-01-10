import { ColumnDef, Table, useReactTable } from '@tanstack/react-table';
import { useVirtual } from 'react-virtual';
import { Row } from '@tanstack/react-table';
import React, { useMemo } from 'react';
import { LeafygreenTableOptions, LeafygreenTableRowData, LeafygreenTableValues } from './useLeafygreenTable.types';
import CheckboxCell from '../CheckboxCell/CheckboxCell';

const useLeafygreenTable = <T extends unknown>(
  props: LeafygreenTableOptions<T>,
) => {
  const { containerRef, data, columns: columnsProp, hasSelectableRows, ...rest } = props;
  const columns = hasSelectableRows ? useMemo<Array<ColumnDef<T>>>(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <CheckboxCell
            checked={table.getIsAllRowsSelected()}
            indeterminate={table.getIsSomeRowsSelected()}
            onChange={table.getToggleAllRowsSelectedHandler()}
            aria-label="Select all rows"
          />
        ),
        cell: ({ row }) => (
          <CheckboxCell
            checked={row.getIsSelected()}
            indeterminate={row.getIsSomeSelected()}
            onChange={row.getToggleSelectedHandler()}
            aria-label={`Select row ${row.index}`}
          />
        ),
      },
      ...columnsProp,
    ],
    []
  ) : columnsProp;

  const table: Table<LeafygreenTableRowData<T>> = useReactTable<LeafygreenTableRowData<T>>({
    data,
    columns,
    getRowCanExpand: (row: Row<LeafygreenTableRowData<T>>) => {
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
  } as LeafygreenTableValues<LeafygreenTableRowData<T>>;
};

export default useLeafygreenTable;
