import React, { PropsWithChildren, ReactElement, ReactNode } from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { isComponentType } from '@leafygreen-ui/lib';

import Cell from '../Cell';
import { depthPadding } from '../Cell/Cell.styles';
import { useTableContext } from '../TableContext/TableContext';
import ToggleExpandedIcon from '../ToggleExpandedIcon';
import { LeafyGreenTableRow, LGRowData } from '../useLeafyGreenTable';
import { getAreAncestorsExpanded } from '../utils/areAncestorsExpanded';

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
  const { getParentRow } = useTableContext();
  const parentRow = getParentRow?.(row.id);
  const isNested = !!parentRow
  const isParentExpanded = !!parentRow && parentRow.getIsExpanded()
  const areAncestorsExpanded = getAreAncestorsExpanded(row.id, getParentRow)
  const isRowVisible = areAncestorsExpanded && isParentExpanded || !isNested

  const isExpandable = row.getCanExpand();
  const isExpanded = row.getIsExpanded();

  const toggleExpanded = () => row.toggleExpanded();

  const CellChildren = React.Children.toArray(children)
    .filter(child =>
      isComponentType(child, 'Cell'),
    );

  return (
    <>
      {React.Children.map(
        CellChildren,
        (child: ReactNode, index: number) => {
          const { className, children, ...props } = (child as ReactElement)?.props
          const isFirstCell = index === 0;
          return (
            <Cell
              {...props}
              className={cx(
                {
                  [
                    depthPadding(row.depth, isExpandable)
                  ]: isFirstCell,
                },
                className
              )}
              cellIndex={index}
              depth={row.depth}
              isRowExpanded={isRowVisible}
              disabled={disabled}
            >
              {isFirstCell && isExpandable && <ToggleExpandedIcon isExpanded={isExpanded} toggleExpanded={toggleExpanded} />}
              {children}
            </Cell>
          )
        },
      )}
    </>
  );
};

export default RowCellChildren;
