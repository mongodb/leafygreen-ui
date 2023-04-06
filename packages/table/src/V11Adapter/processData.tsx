import React, { ReactElement } from 'react';

import { isComponentType } from '@leafygreen-ui/lib';

import { TableRowInterface } from '../TableV10/Table';
import { LGColumnDef, LGRowData, LGTableDataType } from '../useLeafyGreenTable';

import deepSelectComponent from './deepSelectComponent';

const processData = <T extends LGRowData>(
  data: Array<any>,
  processedColumns: Array<LGColumnDef<T>>,
  childrenFn: (TableRowArgs: TableRowInterface<unknown>) => JSX.Element,
) => {
  const processedData = data.map((oldDatum, index) => {
    // for each row, evaluate childrenFn
    const evaluatedChildren = childrenFn({ datum: oldDatum, index });
    const childrenArray = React.Children.toArray(evaluatedChildren);

    const evaluatedRow = deepSelectComponent('Row', childrenArray);
    const rowChildren = React.Children.toArray(evaluatedRow?.props.children);

    const evaluatedCells = rowChildren.filter(
      child =>
        isComponentType(child, 'Cell') ||
        deepSelectComponent('Cell', (child as ReactElement).props.children),
    );

    const newDatum: LGTableDataType<any> = evaluatedCells.reduce(
      (acc: object, currVal, index) => {
        return {
          ...acc,
          // TODO: remove as any
          [(processedColumns[index] as any)?.accessorKey]: () =>
            currVal as ReactElement,
        };
      },
      {},
    );

    const subRowChildren = rowChildren.filter(child =>
      isComponentType(child, 'Row'),
    );
    if (subRowChildren.length > 0) newDatum.subRows = [];
    subRowChildren.map(subRow => {
      const subRowCells = React.Children.toArray(
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
        const processedSubRow = subRowCells.reduce(
          (acc: object, currVal, index) => {
            return {
              ...acc,
              // TODO: remove as any
              [(processedColumns[index] as any)?.accessorKey]: () =>
                (currVal as ReactElement).props.children,
            };
          },
          {},
        );
        newDatum.subRows.push(processedSubRow);
      }
    });

    return newDatum;
  });
  return processedData;
};

export default processData;
