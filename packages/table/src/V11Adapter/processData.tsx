import React, { ReactElement } from 'react';

import { isComponentType } from '@leafygreen-ui/lib';

import { TableRowInterface } from '../TableV10/Table';
import { LGRowData, LGTableDataType } from '../useLeafygreenTable';

const processData = (
  data: Array<any>,
  processedColumns: Array<any>,
  childrenFn: (TableRowArgs: TableRowInterface<unknown>) => JSX.Element,
) => {
  const processedData = data.map((oldDatum, index) => {
    // for each row, evaluate childrenFn
    const evaluatedChildren = childrenFn({ datum: oldDatum, index });
    const childrenArray = React.Children.toArray(evaluatedChildren);
    const evaluatedRow = childrenArray[0] as ReactElement;
    const rowChildren = React.Children.toArray(evaluatedRow.props.children);
    const evaluatedCells = rowChildren.filter(child =>
      isComponentType(child, 'Cell'),
    );
    const newDatum: LGTableDataType<any> = evaluatedCells.reduce(
      (acc: object, currVal, index) => {
        return {
          ...acc,
          [processedColumns[index].accessorKey]: () =>
            (currVal as ReactElement).props.children,
        };
      },
      {},
    );

    const subRowChildren = rowChildren.filter(child =>
      isComponentType(child, 'Row'),
    );
    if (subRowChildren.length > 0) newDatum.subRows = [];
    subRowChildren.forEach(subRow => {
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
              [processedColumns[index].accessorKey]: () =>
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
