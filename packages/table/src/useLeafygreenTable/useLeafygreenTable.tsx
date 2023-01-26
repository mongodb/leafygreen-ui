import React from 'react';
import { useVirtual } from 'react-virtual';
import { ColumnDef, Table, useReactTable } from '@tanstack/react-table';
import PropTypes from 'prop-types';

import CheckboxCell from '../CheckboxCell/CheckboxCell';

import {
  LeafygreenTableOptions,
  LeafygreenTableValues,
} from './useLeafygreenTable.types';
import {
  LeafygreenTable,
  LeafygreenTableRow,
  LeafygreenTableType,
  VirtualizerValues,
} from '.';

const getSelectColumnConfig = <T extends unknown>() => {
  return {
    id: 'select',
    size: 32,
    // eslint-disable-next-line react/display-name
    header: ({ table }: { table: LeafygreenTable<T> }) => (
      <CheckboxCell
        isHeader
        checked={table.getIsAllRowsSelected()}
        indeterminate={table.getIsSomeRowsSelected()}
        onChange={table.getToggleAllRowsSelectedHandler()}
        aria-label="Select all rows"
      />
    ),
    // eslint-disable-next-line react/display-name
    cell: ({ row }: { row: LeafygreenTableRow<T> }) => (
      <CheckboxCell
        checked={row.getIsSelected()}
        indeterminate={row.getIsSomeSelected()}
        onChange={row.getToggleSelectedHandler()}
        aria-label={`Select row ${row.index}`}
      />
    ),
  } as ColumnDef<T>;
};

type NonNullable<T> = Exclude<T, null | undefined>;

function useLeafygreenTable<T extends unknown>(
  props: LeafygreenTableOptions<T>,
): LeafygreenTableValues<T, true>;
function useLeafygreenTable<T extends unknown>(
  props: LeafygreenTableOptions<T>,
): LeafygreenTableValues<T, false>;

function useLeafygreenTable<T extends unknown>(
  props: LeafygreenTableOptions<T>,
): LeafygreenTableValues<T, NonNullable<typeof props.useVirtualScrolling>> {
  const {
    containerRef,
    data,
    columns: columnsProp,
    hasSelectableRows,
    useVirtualScrolling,
    ...rest
  } = props;
  const columns: Array<ColumnDef<LeafygreenTableType<T>>> = [
    ...(hasSelectableRows
      ? [getSelectColumnConfig() as ColumnDef<LeafygreenTableType<T>>]
      : []),
    ...columnsProp.map(
      propColumn =>
        ({
          ...propColumn,
          enableSorting: propColumn.enableSorting ?? false,
        } as ColumnDef<LeafygreenTableType<T>>),
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
    // eslint-disable-next-line react-hooks/rules-of-hooks
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
  } as LeafygreenTableValues<T, NonNullable<typeof useVirtualScrolling>>;
}

useLeafygreenTable.propTypes = {
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

export default useLeafygreenTable;
