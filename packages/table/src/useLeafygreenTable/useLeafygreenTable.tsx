import { ColumnDef, Table, useReactTable } from '@tanstack/react-table';
import { useVirtual } from 'react-virtual';
import React from 'react';
import {
  LeafygreenTableOptions,
  LeafygreenTableValues,
} from './useLeafygreenTable.types';
import CheckboxCell from '../CheckboxCell/CheckboxCell';
import { LeafygreenTableRow, LeafygreenTableType, VirtualizerValues } from '.';

const getSelectColumnConfig = <T extends unknown>() => {
  return {
    id: 'select',
    size: 32,
    header: ({ table }) => (
      <CheckboxCell
        isHeader
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
  } as ColumnDef<LeafygreenTableType<T>, any>;
}

function useLeafygreenTable<T extends unknown>(
  props: LeafygreenTableOptions<T>,
): (LeafygreenTableValues<T>) {
  const {
    containerRef,
    data,
    columns: columnsProp,
    hasSelectableRows,
    // not sure what's going on here since the prop is clearly defined
    // @ts-ignore
    useVirtualScrolling,
    ...rest
  } = props;
  const columns: Array<ColumnDef<LeafygreenTableType<T>, any>> = [
    ...(hasSelectableRows
      ? [getSelectColumnConfig() as ColumnDef<LeafygreenTableType<T>, any>]
      : []),
    ...columnsProp.map(
      propColumn =>
      ({
        ...propColumn,
        enableSorting: propColumn.enableSorting ?? false,
      } as ColumnDef<LeafygreenTableType<T>, any>),
    ),
  ];

  const table: Table<LeafygreenTableType<T>> = useReactTable<
    LeafygreenTableType<T>
  >({
    data,
    columns,
    getRowCanExpand: (row: LeafygreenTableRow<T>) => {
      return (
        !!row.original.renderExpandedContent ||
        ((table.options.enableExpanding ?? true) && !!row.subRows?.length)
      );
    },
    enableSortingRemoval: true,
    ...rest,
  });
  let rowVirtualizer: VirtualizerValues | undefined;

  if (useVirtualScrolling) {
    const { rows } = table.getRowModel();
    rowVirtualizer = useVirtual({
      parentRef: containerRef,
      size: rows.length,
    });
  }

  return {
    ...table,
    ...(rowVirtualizer && {
      virtualRows: rowVirtualizer.virtualItems,
      totalSize: rowVirtualizer.totalSize,
    }),
  } as LeafygreenTableValues<T>;
};

export default useLeafygreenTable;
