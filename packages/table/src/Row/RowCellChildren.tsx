import React, { PropsWithChildren, ReactElement, ReactNode } from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { isComponentType } from '@leafygreen-ui/lib';

import Cell from '../Cell';
import { depthPadding } from '../Cell/Cell.styles';
import ToggleExpandedIcon from '../ToggleExpandedIcon';
import { LeafyGreenTableRow, LGRowData } from '../useLeafyGreenTable';

interface RowCellChildrenProps<T extends LGRowData>
  extends PropsWithChildren<{
    row: LeafyGreenTableRow<T>;
    disabled?: boolean;
  }> { }

/**
 * Renders row cells provided by `useReactTable`
 */
const RowCellChildren = <T extends LGRowData>({
  row,
  children,
  disabled,
}: RowCellChildrenProps<T>) => {
  const isExpandable = row.getCanExpand();
  const isExpanded = row.getIsExpanded();
  const toggleExpanded = () => row.toggleExpanded();

  const CellChildren = React.Children.toArray(children)
    .filter(child =>
      isComponentType(child, 'Cell'),
    );

  const firstCellProps = (CellChildren[0] as ReactElement)?.props
  const OtherCellChildren = CellChildren.slice(1);

  return (
    <>
      <Cell
        {...firstCellProps}
        className={cx(depthPadding(row.depth, isExpandable), firstCellProps.className)}
        cellIndex={0}
        disabled={disabled}
      >
        {isExpandable && <ToggleExpandedIcon isExpanded={isExpanded} toggleExpanded={toggleExpanded} />}
        {firstCellProps.children}
      </Cell>
      {React.Children.map(
        OtherCellChildren,
        (CellChild: ReactNode, index: number) => (
          <Cell
            {...(CellChild as ReactElement)?.props}
            cellIndex={index + 1}
            depth={row.depth}
            disabled={disabled}
          />
        ),
      )}
    </>
  );
};

export default RowCellChildren;
