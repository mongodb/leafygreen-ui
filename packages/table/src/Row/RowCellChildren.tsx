import React, { PropsWithChildren, ReactElement, ReactNode } from 'react';

import { isComponentType } from '@leafygreen-ui/lib';

import Cell from '../Cell';
import ExpandingCell from '../Cell/ExpandingCell';
import FirstCell from '../Cell/FirstCell';
import { LeafyGreenTableRow, LGRowData } from '../useLeafygreenTable';

interface RowCellChildrenProps<T extends LGRowData>
  extends PropsWithChildren<{
    row: LeafyGreenTableRow<T>;
    disabled?: boolean;
  }> { }

/**
 * Renders row cells provided by `useReactTable`
 */
const RowCellChildren = <T extends LGRowData>({ row, children, disabled }: RowCellChildrenProps<T>) => {
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
        <ExpandingCell
          {...(FirstCellChild as ReactElement)?.props}
          cellIndex={0}
          depth={row.depth}
          isExpanded={isExpanded}
          toggleExpanded={toggleExpanded}
          disabled={disabled}
        />
      ) : (
        <FirstCell
          {...(FirstCellChild as ReactElement)?.props}
          cellIndex={0}
          depth={row.depth}
          disabled={disabled}
        />
      )}
      {React.Children.map(
        OtherCellChildren,
        (CellChild: ReactNode, index: number) =>
        (<Cell {
          ...(CellChild as ReactElement)?.props}
          cellIndex={index + 1}
          depth={row.depth}
          disabled={disabled}
        />)
      )}
    </>
  );
};

export default RowCellChildren;
