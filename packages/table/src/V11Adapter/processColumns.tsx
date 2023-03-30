import React, { ReactElement } from 'react';
import { Row } from '@tanstack/react-table';
import camelCase from 'lodash/camelCase';

import { TableProps } from '../TableV10/Table';
import { TableHeaderProps } from '../TableV10/TableHeader';
import { LGColumnDef, LGRowData } from '../useLeafyGreenTable';

/**
 * Converts V10's HeaderRow ReactElement to an Array<ColumnDef>
 * to be consumed by `react-table`.
 *
 * @param data returned value from `processData`
 * @param columns V10's `columns` prop
 * @param headerLabels any overrides to the header's label when the label does not correspond to its data's key in `data`
 * @returns Array<ColumnDef>
 */
const processColumns = <T extends LGRowData>(
  data: Array<T>,
  columns: TableProps<any>['columns'],
  headerLabels?: { [key: string]: string },
) => {
  const HeaderRow = React.Children.toArray(columns)[0] as ReactElement;
  const TableHeaders = React.Children.toArray(HeaderRow.props.children);
  const processedColumns: Array<LGColumnDef<T>> = [];
  TableHeaders.forEach(TableHeader => {
    const headerProps = (TableHeader as ReactElement).props;
    const hasSorting =
      !!headerProps.sortBy ||
      !!headerProps.handleSort ||
      !!headerProps.compareFn;

    const convertedCompareFn = (
      compareFn: TableHeaderProps<any>['compareFn'],
    ) => {
      return (rowA: Row<any>, rowB: Row<any>, _: any) => {
        const indexA = rowA.index;
        const indexB = rowB.index;
        // @ts-expect-error this function is only invoked when compareFn exists
        return compareFn(data[indexA], data[indexB], 'asc');
      };
    };

    const defaultSortingFn = () => {
      return (rowA: Row<any>, rowB: Row<any>, columnId: string) => {
        const indexA = rowA.index;
        const indexB = rowB.index;
        // @ts-expect-error each datum is designed to be indexable by string
        return data[indexA][columnId] > data[indexB][columnId]
          ? -1
          : // @ts-expect-error each datum is designed to be indexable by string
          data[indexB][columnId] > data[indexA][columnId]
          ? 1
          : 0;
      };
    };

    processedColumns.push({
      accessorKey:
        (headerLabels && headerLabels[headerProps.label]) ??
        camelCase(headerProps.label),
      header: headerProps.label,
      align: headerProps.dataType === 'number' ? 'right' : 'left',
      enableSorting: hasSorting,
      sortingFn: headerProps.compareFn
        ? convertedCompareFn(headerProps)
        : hasSorting
        ? defaultSortingFn()
        : undefined,
    });
  });
  return processedColumns;
};

export default processColumns;
