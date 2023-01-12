import { ColumnDef, Table, useReactTable } from '@tanstack/react-table';
import { useVirtual } from 'react-virtual';
import { Row } from '@tanstack/react-table';
import React, { useMemo } from 'react';
import {
  LeafygreenTableOptions,
  LeafygreenTableRowData,
  LeafygreenTableValues,
} from './useLeafygreenTable.types';
import CheckboxCell from '../CheckboxCell/CheckboxCell';

const SelectColumnConfig = {
  id: 'select',
  size: 36,
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
};

const useLeafygreenTable = <T extends unknown>(
  props: LeafygreenTableOptions<T>,
) => {
  const {
    containerRef,
    data,
    columns: columnsProp,
    hasSelectableRows,
    useVirtualScrolling,
    ...rest
  } = props;
  const columns: Array<ColumnDef<LeafygreenTableRowData<T>, any>> = [
    ...(hasSelectableRows
      ? [SelectColumnConfig as ColumnDef<LeafygreenTableRowData<T>, any>]
      : []),
    ...columnsProp.map(
      propColumn =>
        ({
          ...propColumn,
          enableSorting: propColumn.enableSorting ?? false,
        } as ColumnDef<LeafygreenTableRowData<T>, any>),
    ),
  ];

  const table: Table<LeafygreenTableRowData<T>> = useReactTable<
    LeafygreenTableRowData<T>
  >({
    data,
    columns,
    getRowCanExpand: (row: Row<LeafygreenTableRowData<T>>) => {
      return (
        !!row.original.renderExpandedContent ||
        ((table.options.enableExpanding ?? true) && !!row.subRows?.length)
      );
    },
    enableSortingRemoval: true,
    ...rest,
  });
  let rowVirtualizer;

  if (useVirtualScrolling) {
    const { rows } = table.getRowModel();
    rowVirtualizer = useVirtual({
      parentRef: containerRef,
      size: rows.length,
    });
  }

  return {
    ...table,
    ...(rowVirtualizer
      ? {
          virtualRows: rowVirtualizer.virtualItems,
          totalSize: rowVirtualizer.totalSize,
        }
      : {}),
  } as LeafygreenTableValues<LeafygreenTableRowData<T>>;
};

export default useLeafygreenTable;
