import { useVirtual } from 'react-virtual';
import { useReactTable } from '@tanstack/react-table';
import {
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from '@tanstack/react-table';
import omit from 'lodash/omit';

import { TableHeaderCheckbox } from './TableHeaderCheckbox';
import { TableRowCheckbox } from './TableRowCheckbox';
import { LeafyGreenTableOptions, LGRowData } from './useLeafyGreenTable.types';
import { LeafyGreenTable, LGColumnDef, LGTableDataType } from '.';

const checkboxWidth = 14;

/**
 * A `ColumnDef` object injected into `useReactTable`'s `columns` option when the user is using selectable rows.
 */
const baseSelectColumnConfig: LGColumnDef<LGRowData> = {
  id: 'select',
  size: checkboxWidth,
  header: TableHeaderCheckbox,
  cell: TableRowCheckbox,
};

function useLeafyGreenTable<T extends LGRowData>({
  containerRef,
  data,
  columns: columnsProp,
  hasSelectableRows,
  withPagination = false,
  useVirtualScrolling = false,
  allowSelectAll = true,
  ...rest
}: LeafyGreenTableOptions<T>): LeafyGreenTable<T> {
  let hasSortableColumns = false;
  const selectColumnConfig = allowSelectAll
    ? baseSelectColumnConfig
    : omit(baseSelectColumnConfig, 'header');
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
