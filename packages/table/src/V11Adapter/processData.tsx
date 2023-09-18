import React, { ReactElement } from 'react';
import flattenChildren from 'react-keyed-flatten-children';
import { AccessorKeyColumnDef } from '@tanstack/react-table';

import { isComponentType } from '@leafygreen-ui/lib';

import { TableRowInterface } from '../TableV10/Table';
import { LGTableDataType } from '../useLeafyGreenTable';

import { ProcessedRowData, ValidDataType } from './V11Adapter.types';

const processData: (
  data: Array<any>,
  processedColumns: Array<AccessorKeyColumnDef<any>>,
  childrenFn: (TableRowArgs: TableRowInterface<unknown>) => JSX.Element,
) => Array<ProcessedRowData> = <T extends ValidDataType>(
  data: Array<any>,
  processedColumns: Array<AccessorKeyColumnDef<T>>,
  childrenFn: (TableRowArgs: TableRowInterface<unknown>) => JSX.Element,
) => {
  const processedData = data.map((oldDatum, index) => {
    // for each row, evaluate childrenFn
    const evaluatedChildren = childrenFn({ datum: oldDatum, index });
    const childrenArray = flattenChildren(evaluatedChildren);

    const evaluatedRow = childrenArray.filter(child =>
      isComponentType(child, 'Row'),
    )[0];
    const rowChildren = flattenChildren(
      (evaluatedRow as ReactElement).props.children,
    );

    const evaluatedCells = rowChildren.filter(child =>
      isComponentType(child, 'Cell'),
    );

    const newDatum: LGTableDataType<T> = evaluatedCells.reduce(
      (acc: T, currVal, index) => {
        return {
          ...acc,
          [processedColumns[index]?.accessorKey]: () => currVal as ReactElement,
        } as T;
      },
      {} as T,
    );

    const subRowChildren = rowChildren.filter(child =>
      isComponentType(child, 'Row'),
    );
    if (subRowChildren.length > 0) newDatum.subRows = [];
    subRowChildren.map(subRow => {
      const subRowCells = flattenChildren(
        (subRow as ReactElement).props.children,
      );
      const firstSubRowCell = subRowCells[0];
      const firstSubRowCellColSpan = (firstSubRowCell as ReactElement).props
        .colSpan;

      if (
        firstSubRowCellColSpan &&
        firstSubRowCellColSpan === processedColumns.length
      ) {
        // eslint-disable-next-line react/display-name
        newDatum.renderExpandedContent = () => (
          <div style={{ padding: '10px 8px 10px 32px' }}>
            {(firstSubRowCell as ReactElement).props.children}
          </div>
        );
      } else {
        const processedSubRow = subRowCells.reduce((acc: T, currVal, index) => {
          return {
            ...acc,
            [processedColumns[index]?.accessorKey]: () =>
              currVal as ReactElement,
          };
        }, {} as T);
        const {
          children,
          expanded,
          indentLevel,
          isAnyAncestorCollapsed,
          ...rowProps
        } = (subRow as ReactElement).props;
        newDatum.subRows &&
          newDatum.subRows.push({
            ...processedSubRow,
            rowProps,
          } as T);
      }
    });

    return { ...newDatum, rowProps: (evaluatedRow as ReactElement).props };
  });
  return processedData;
};

export default processData;
