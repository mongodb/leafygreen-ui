import React from 'react';
import { useVirtual } from 'react-virtual';
import { ColumnDef, useReactTable } from '@tanstack/react-table';
import PropTypes from 'prop-types';

import { CheckboxCell } from '../Cell';

import {
  LeafyGreenTableOptions,
  LeafyGreenTableValues,
  LGRowData,
} from './useLeafyGreenTable.types';
import {
  LeafyGreenTable,
  LeafyGreenTableRow,
  LGTableDataType,
  VirtualizerValues,
} from '.';

const getSelectColumnConfig = <T extends LGRowData>() => {
  return {
    id: 'select',
    size: 32,
    // eslint-disable-next-line react/display-name
    header: ({ table }: { table: LeafyGreenTable<T> }) => (
      <CheckboxCell
        checked={table.getIsAllRowsSelected()}
        indeterminate={table.getIsSomeRowsSelected()}
        onChange={table.getToggleAllRowsSelectedHandler()}
        aria-label="Select all rows"
      />
    ),
    // eslint-disable-next-line react/display-name
    cell: ({ row }: { row: LeafyGreenTableRow<T> }) => (
      <CheckboxCell
        checked={row.getIsSelected()}
        indeterminate={row.getIsSomeSelected()}
        onChange={row.getToggleSelectedHandler()}
        aria-label={`Select row ${row.index}`}
      />
    ),
  } as ColumnDef<T, unknown>;
};

function useLeafyGreenTable<T extends LGRowData, VS extends boolean = true>(
  props: LeafyGreenTableOptions<T, VS>,
): LeafyGreenTableValues<T, VS>;

function useLeafyGreenTable<T extends LGRowData, VS extends boolean = false>(
  props: LeafyGreenTableOptions<T, VS>,
): LeafyGreenTableValues<T, VS>;

function useLeafyGreenTable<T extends LGRowData, VS extends boolean>({
  containerRef,
  data,
  columns: columnsProp,
  hasSelectableRows,
  useVirtualScrolling = false as VS,
  ...rest
}: LeafyGreenTableOptions<T, VS>): LeafyGreenTableValues<T, VS> {
  type ColumnType = ColumnDef<LGTableDataType<T>, unknown>;

  const columns: Array<ColumnType> = [
    ...(hasSelectableRows ? [getSelectColumnConfig() as ColumnType] : []),
    ...columnsProp.map(
      propColumn =>
      ({
        ...propColumn,
        enableSorting: propColumn.enableSorting ?? false,
      } as ColumnType),
    ),
  ];

  const table: LeafyGreenTable<T> = useReactTable<LGTableDataType<T>>({
    data,
    columns,
    getRowCanExpand: row => {
      return !!row.original.renderExpandedContent || !!row.subRows?.length;
    },
    enableExpanding: true,
    enableSortingRemoval: true,
    ...rest,
  });
  let rowVirtualizer: VirtualizerValues | undefined;

  if (useVirtualScrolling) {
    const { rows } = table.getRowModel();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    rowVirtualizer = useVirtual({
      parentRef: containerRef,
      size: rows.length,
      overscan: 30,
    });
  }

  return {
    ...table,
    ...(rowVirtualizer && {
      virtualRows: rowVirtualizer.virtualItems,
      totalSize: rowVirtualizer.totalSize,
    }),
  } as LeafyGreenTableValues<T, VS>;
}

useLeafyGreenTable.propTypes = {
  onRowSelectionChange: PropTypes.any,
  enableSubRowSelection: PropTypes.any,
  enableMultiRowSelection: PropTypes.any,
  enableRowSelection: PropTypes.any,
  getPaginationRowModel: PropTypes.any,
  autoResetPageIndex: PropTypes.bool,
  onPaginationChange: PropTypes.any,
  manualPagination: PropTypes.bool,
  pageCount: PropTypes.number,
  onColumnSizingInfoChange: PropTypes.any,
  onColumnSizingChange: PropTypes.any,
  columnResizeMode: PropTypes.any,
  enableColumnResizing: PropTypes.bool,
  paginateExpandedRows: PropTypes.bool,
  getRowCanExpand: PropTypes.any,
  getIsRowExpanded: PropTypes.any,
  getExpandedRowModel: PropTypes.any,
  enableExpanding: PropTypes.bool,
  autoResetExpanded: PropTypes.bool,
  onExpandedChange: PropTypes.any,
  manualExpanding: PropTypes.bool,
  groupedColumnMode: PropTypes.any,
  getGroupedRowModel: PropTypes.any,
  enableGrouping: PropTypes.bool,
  onGroupingChange: PropTypes.any,
  manualGrouping: PropTypes.bool,
  isMultiSortEvent: PropTypes.any,
  maxMultiSortColCount: PropTypes.number,
  getSortedRowModel: PropTypes.any,
  sortDescFirst: PropTypes.bool,
  enableMultiSort: PropTypes.bool,
  enableMultiRemove: PropTypes.bool,
  enableSortingRemoval: PropTypes.bool,
  enableSorting: PropTypes.bool,
  onSortingChange: PropTypes.any,
  manualSorting: PropTypes.bool,
  aggregationFns: PropTypes.any,
  sortingFns: PropTypes.any,
  filterFns: PropTypes.any,
  getFacetedMinMaxValues: PropTypes.any,
  getFacetedUniqueValues: PropTypes.any,
  getFacetedRowModel: PropTypes.any,
  getColumnCanGlobalFilter: PropTypes.any,
  enableGlobalFilter: PropTypes.bool,
  onGlobalFilterChange: PropTypes.any,
  globalFilterFn: PropTypes.any,
  enableColumnFilters: PropTypes.bool,
  onColumnFiltersChange: PropTypes.any,
  getFilteredRowModel: PropTypes.any,
  maxLeafRowFilterDepth: PropTypes.number,
  filterFromLeafRows: PropTypes.bool,
  manualFiltering: PropTypes.bool,
  enableFilters: PropTypes.bool,
  enablePinning: PropTypes.bool,
  onColumnPinningChange: PropTypes.any,
  onColumnOrderChange: PropTypes.any,
  enableHiding: PropTypes.bool,
  onColumnVisibilityChange: PropTypes.any,
  renderFallbackValue: PropTypes.any,
  onStateChange: PropTypes.any,
  state: PropTypes.any,
  defaultColumn: PropTypes.any,
  columns: PropTypes.any.isRequired,
  getRowId: PropTypes.any,
  getSubRows: PropTypes.any,
  getCoreRowModel: PropTypes.any.isRequired,
  mergeOptions: PropTypes.any,
  autoResetAll: PropTypes.bool,
  initialState: PropTypes.any,
  debugRows: PropTypes.bool,
  debugColumns: PropTypes.bool,
  debugHeaders: PropTypes.bool,
  debugTable: PropTypes.bool,
  debugAll: PropTypes.bool,
  meta: PropTypes.any,
  data: PropTypes.any.isRequired,
  useVirtualScrolling: PropTypes.bool,
  hasSelectableRows: PropTypes.bool,
  containerRef: PropTypes.any.isRequired,
};

export default useLeafyGreenTable;
