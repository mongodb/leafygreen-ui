import React, { ReactElement } from 'react';
import { Row } from '@tanstack/react-table';
import camelCase from 'lodash/camelCase';

import { Align } from '../Cell/Cell.types';
import { TableProps } from '../TableV10/Table';
import { LGRowData } from '../useLeafyGreenTable';

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
  columns: TableProps<T>['columns'],
  headerLabels?: { [key: string]: string },
) => {
  const columnsChildren = React.Children.toArray(columns);

  let TableHeaders;

  // when columnsChildren.length > 1, columns was passed an array of TableHeaders instead of a HeaderRow.
  if (columnsChildren.length > 1) {
    TableHeaders = columnsChildren;
  } else {
    const HeaderRow = columnsChildren[0] as ReactElement;
    TableHeaders = React.Children.toArray(HeaderRow.props.children);
  }

  const processedColumns = TableHeaders.map(TableHeader => {
    const headerProps = (TableHeader as ReactElement).props;

    const hasSorting =
      !!headerProps.sortBy ||
      !!headerProps.handleSort ||
      !!headerProps.compareFn;

    const convertedCompareFn = (rowA: Row<any>, rowB: Row<any>, _: any) => {
      const indexA = rowA.index;
      const indexB = rowB.index;
      return headerProps.compareFn(data[indexA], data[indexB]);
    };

    const defaultSortingFn = (
      rowA: Row<any>,
      rowB: Row<any>,
      columnId: string,
    ) => {
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

    const retVal = {
      accessorKey:
        (headerLabels && headerLabels[headerProps.label]) ??
        camelCase(headerProps.label),
      header: headerProps.label,
      align: (headerProps.dataType === 'number' ? 'right' : 'left') as Align,
      enableSorting: hasSorting,
      sortingFn: headerProps.compareFn
        ? convertedCompareFn
        : hasSorting
        ? defaultSortingFn
        : undefined,
    };

    return retVal;
  });
  return processedColumns;
};

export default processColumns;
