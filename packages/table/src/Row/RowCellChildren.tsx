import React, { PropsWithChildren, ReactElement, ReactNode } from 'react';
import { Row } from '@tanstack/react-table';

import { isComponentType } from '@leafygreen-ui/lib';

import Cell from '../Cell';
import ExpandingCell from '../Cell/ExpandingCell';
import FirstCell from '../Cell/FirstCell';
import { LeafygreenTableRow } from '../useLeafygreenTable';

interface RowCellChildrenProps
  extends PropsWithChildren<{
    row: LeafygreenTableRow<any>;
    disabled?: boolean;
  }> {}

const RowCellChildren = ({ row, children, disabled }: RowCellChildrenProps) => {
  const isExpandable = row.getCanExpand();
  const isExpanded = row.getIsExpanded();
  const toggleExpanded = () => row.toggleExpanded();

  const CellChildren = React.Children.toArray(children).filter(child =>
    isComponentType(child, 'Cell'),
  );
  const FirstCellChild = CellChildren[0];
  const OtherCellChildren = CellChildren.slice(1);

  return (
    <>
      {isExpandable ? (
        <>
          {React.createElement(ExpandingCell, {
            ...(FirstCellChild as ReactElement)?.props,
            cellIndex: 0,
            depth: row.depth,
            isExpanded: isExpanded,
            toggleExpanded,
            disabled,
          })}
        </>
      ) : (
        <>
          {React.createElement(FirstCell, {
            ...(FirstCellChild as ReactElement)?.props,
            cellIndex: 0,
            depth: row.depth,
            disabled,
          })}
        </>
      )}
      {React.Children.map(
        OtherCellChildren,
        (CellChild: ReactNode, index: number) => {
          return React.createElement(Cell, {
            ...(CellChild as ReactElement)?.props,
            cellIndex: index + 1,
            depth: row.depth,
            disabled,
          });
        },
      )}
    </>
  );
};

export default RowCellChildren;
