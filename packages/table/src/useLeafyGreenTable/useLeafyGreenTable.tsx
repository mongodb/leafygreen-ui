import React, { useState } from 'react';
import isEqual from 'react-fast-compare';
import {
  ExpandedState,
  getExpandedRowModel,
  RowModel,
  Table,
  useReactTable,
} from '@tanstack/react-table';
import {
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from '@tanstack/react-table';
import omit from 'lodash/omit';

import { usePrevious } from '@leafygreen-ui/hooks';
import { spacing } from '@leafygreen-ui/tokens';

import { TableHeaderCheckbox } from './TableHeaderCheckbox';
import { TableRowCheckbox } from './TableRowCheckbox';
import { LeafyGreenTableOptions, LGRowData } from './useLeafyGreenTable.types';
import { LeafyGreenTable, LGColumnDef, LGTableDataType } from '.';

const CHECKBOX_WIDTH = spacing[1000];

function useLeafyGreenTable<T extends LGRowData, V extends unknown = unknown>({
  data,
  columns: columnsProp,
  hasSelectableRows,
  withPagination = false,
  allowSelectAll = true,
  ...rest
}: LeafyGreenTableOptions<T, V>): LeafyGreenTable<T> {
  const [expanded, setExpanded] = useState<ExpandedState>(
    (rest.initialState?.expanded as ExpandedState) ?? {},
  );

  const prevColumns = usePrevious(columnsProp);
  /**
   * This is used to determine if table rows should re-render. If the column definitions are the same, table rows will not re-render. If they are different, all rows will re-render.
   *
   * On initial load, prevColumns is undefined, so we should consider them equal
   * to avoid unnecessary re-renders after the first load
   */
  const shouldMemoizeRows =
    prevColumns === undefined || isEqual(prevColumns, columnsProp);

  // console.log('👿', {
  //   prevColumns,
  //   columnsProp,
  //   areEqual: shouldMemoizeRows,
  //   isInitialLoad: prevColumns === undefined,
  // });

  /**
   * A `ColumnDef` object injected into `useReactTable`'s `columns` option when the user is using selectable rows.
   */
  const baseSelectColumnConfig: LGColumnDef<T, V> = {
    id: 'select',
    size: CHECKBOX_WIDTH,
    header: TableHeaderCheckbox,
    cell: TableRowCheckbox,
  };

  const hasSortableColumns = React.useMemo(
    () => columnsProp.some(propCol => !!propCol.enableSorting),
    [columnsProp],
  );

  const selectColumnConfig = allowSelectAll
    ? baseSelectColumnConfig
    : omit(baseSelectColumnConfig, 'header');

  const columns = React.useMemo<Array<LGColumnDef<T, V>>>(
    () => [
      ...(hasSelectableRows ? [selectColumnConfig as LGColumnDef<T, V>] : []),
      ...columnsProp,
    ],
    [columnsProp, hasSelectableRows, selectColumnConfig],
  );

  /**
   *  Custom getExpandedRowModel that manipulates rows to include expandedContent.
   */
  function getLGExpandedRowModel<TData extends LGTableDataType<T>>() {
    return (table: Table<TData>) => {
      const baseExpandedRowModel = getExpandedRowModel<TData>()(table);

      // Return a function that computes the custom RowModel
      return () => {
        // Get the default expanded row model by invoking baseExpandedRowModel
        const rowModel = baseExpandedRowModel();
        const modifiedRows = [...rowModel.rows];

        for (let i = 0; i < modifiedRows.length; i++) {
          if (
            modifiedRows[i].original.renderExpandedContent &&
            modifiedRows[i].getIsExpanded()
          ) {
            const expandedData = {
              ...modifiedRows[i],
              id: `${modifiedRows[i].id}-expandedContent`,
              isExpandedContent: true,
            };
            modifiedRows.splice(i + 1, 0, expandedData);
            i++; // Increment index to skip the newly added item
          }
        }

        return {
          ...rowModel,
          rows: modifiedRows,
        } as RowModel<TData>;
      };
    };
  }

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
    onExpandedChange: setExpanded,
    getExpandedRowModel: getLGExpandedRowModel(),
    ...rest,
    state: {
      expanded,
      ...rest.state,
    },
  });

  return {
    ...table,
    hasSelectableRows,
    shouldMemoizeRows,
  } as LeafyGreenTable<T>;
}

export default useLeafyGreenTable;
