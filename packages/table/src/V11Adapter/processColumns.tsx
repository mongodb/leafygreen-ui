import React, { ReactElement } from 'react';
import camelCase from 'lodash/camelCase';

import { TableProps } from '../TableV10/Table';
import { LGColumnDef, LGRowData } from '../useLeafyGreenTable';

const processColumns = <T extends LGRowData>(
  data: Array<T>,
  columns: TableProps<any>['columns'],
  headerLabelMapping?: { [key: string]: string },
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
    processedColumns.push({
      accessorKey:
        (headerLabelMapping && headerLabelMapping[headerProps.label]) ??
        camelCase(headerProps.label),
      header: headerProps.label,
      align: headerProps.dataType === 'number' ? 'right' : 'left',
      enableSorting: hasSorting,
      sortingFn: headerProps.compareFn
        ? (rowA, rowB, _) => {
            const indexA = rowA.index;
            const indexB = rowB.index;
            return headerProps.compareFn(data[indexA], data[indexB]);
          }
        : hasSorting
        ? (rowA, rowB, columnId) => {
            const indexA = rowA.index;
            const indexB = rowB.index;
            return data[indexA][columnId] > data[indexB][columnId]
              ? -1
              : data[indexB][columnId] > data[indexA][columnId]
              ? 1
              : 0;
          }
        : undefined,
    });
  });
  return processedColumns;
};

export default processColumns;
