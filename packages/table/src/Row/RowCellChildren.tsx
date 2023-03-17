import { isComponentType } from '@leafygreen-ui/lib';
import React, { ReactElement, ReactNode } from 'react';
import Cell from '../Cell';
import ExpandingCell from '../Cell/ExpandingCell';
import FirstCell from '../Cell/FirstCell';
import { useTableContext } from "../TableContext/TableContext";

const RowCellChildren = ({ row, children, disabled }) => {
  const { isExpandedRow, toggleExpandedRow } = useTableContext();
  const CellChildren = React.Children.toArray(children).filter(child =>
    isComponentType(child, 'Cell'),
  );
  const FirstCellChild = CellChildren[0];
  const OtherCellChildren = CellChildren.slice(1);
  return (
    <>
      {row.getCanExpand()
        ? (
          <>
            {
              React.createElement(ExpandingCell, {
                ...(FirstCellChild as ReactElement)?.props,
                cellIndex: 0,
                depth: row.depth,
                isExpanding: isExpandedRow(row.id),
                toggleIsExpanding: () => toggleExpandedRow(row.id),
                disabled,
              })
            }
          </>
        ) : (
          <>
            {React.createElement(FirstCell, {
              ...(FirstCellChild as ReactElement)?.props,
              cellIndex: 0,
              depth: row.depth,
              disabled
            })}
          </>
        )}
      {
        React.Children.map(
          OtherCellChildren,
          (CellChild: ReactNode, index: number) => {
            return React.createElement(Cell, {
              ...(CellChild as ReactElement)?.props,
              cellIndex: index + 1,
              depth: row.depth,
              disabled,
            });
          },
        )
      }
    </>
  );
}

export default RowCellChildren;