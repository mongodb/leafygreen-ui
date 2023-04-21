import React from 'react';
import { useVirtual } from 'react-virtual';
import { Table, useReactTable } from '@tanstack/react-table';
import {
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  Row,
} from '@tanstack/react-table';

import Checkbox from '@leafygreen-ui/checkbox';

import { LeafyGreenTableOptions, LGRowData } from './useLeafyGreenTable.types';
import { LeafyGreenTable, LGColumnDef, LGTableDataType } from '.';

const checkboxWidth = 14;

/**
 * A `ColumnDef` object injected into `useReactTable`'s `columns` option when the user is using selectable rows.
 */
const selectColumnConfig: LGColumnDef<LGRowData> = {
  id: 'select',
  size: checkboxWidth,
  header:
    // eslint-disable-next-line react/display-name
    ({ table }: { table: Table<LGTableDataType<LGRowData>> }) => (
      <Checkbox
        checked={table.getIsAllRowsSelected()}
        indeterminate={table.getIsSomeRowsSelected()}
        onChange={table.getToggleAllRowsSelectedHandler()}
        aria-label="Select all rows"
      />
    ),
  cell:
    // eslint-disable-next-line react/display-name
    ({
      row,
      table,
    }: {
      table: Table<LGTableDataType<LGRowData>>;
      row: Row<LGTableDataType<LGRowData>>;
    }) => (
      <Checkbox
        checked={row.getIsSelected()}
        indeterminate={row.getIsSomeSelected()}
        onChange={row.getToggleSelectedHandler()}
        aria-label={`Select row ${row.id}`}
        aria-controls={`lg-table-row-${row.id}`}
        // Don't animate if _all_ rows have been checked (usually, if header row is clicked). Not the _best_ check, but it mostly works
        animate={!table.getIsAllRowsSelected()}
      />
    ),
};

function useLeafyGreenTable<T extends LGRowData>({
  containerRef,
  data,
  columns: columnsProp,
  hasSelectableRows,
  withPagination = false,
  useVirtualScrolling = false,
  ...rest
}: LeafyGreenTableOptions<T>): LeafyGreenTable<T> {
  let hasSortableColumns = false;
  const columns: Array<LGColumnDef<T>> = [
    ...(hasSelectableRows ? [selectColumnConfig as LGColumnDef<T>] : []),
    ...columnsProp.map(propColumn => {
      hasSortableColumns = propColumn.enableSorting ?? false;
      return {
        ...propColumn,
        align: propColumn.align ?? 'left',
        enableSorting: propColumn.enableSorting ?? false,
      } as LGColumnDef<T>;
    }),
  ];

  const table = useReactTable<LGTableDataType<T>>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getRowCanExpand: row => {
      return !!row.original.renderExpandedContent || !!row.subRows?.length;
    },
    enableExpanding: true,
    enableSortingRemoval: hasSortableColumns ? true : undefined,
    getSubRows: row => row.subRows,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: withPagination ? getPaginationRowModel() : undefined,
    ...rest,
  });

  const { rows } = table.getRowModel();
  const _rowVirtualizer = useVirtual({
    parentRef: containerRef,
    size: rows.length,
    overscan: 30,
  });

  return {
    ...table,
    ...(useVirtualScrolling && {
      virtualRows: _rowVirtualizer.virtualItems,
      totalSize: _rowVirtualizer.totalSize,
    }),
    hasSelectableRows,
  } as LeafyGreenTable<T>;
}

export default useLeafyGreenTable;
