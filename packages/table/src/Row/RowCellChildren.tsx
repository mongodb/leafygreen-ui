import React, { PropsWithChildren, ReactElement, ReactNode } from 'react';

import { isComponentType } from '@leafygreen-ui/lib';

import { Cell } from '../Cell';
import { useTableContext } from '../TableContext/TableContext';
import ToggleExpandedIcon from '../ToggleExpandedIcon';
import { LeafyGreenTableRow, LGRowData } from '../useLeafyGreenTable';
import { getAreAncestorsExpanded } from '../utils/areAncestorsExpanded';

interface RowCellChildrenProps<T extends LGRowData>
  extends PropsWithChildren<{
    row: LeafyGreenTableRow<T>;
    disabled?: boolean;
  }> {}

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
  const isNested = !!parentRow;
  const isParentExpanded = !!parentRow && parentRow.getIsExpanded();
  const areAncestorsExpanded = getAreAncestorsExpanded(row.id, getParentRow);
  const isRowVisible = (areAncestorsExpanded && isParentExpanded) || !isNested;

  const isExpandable = row.getCanExpand();
  const isExpanded = row.getIsExpanded();

  const toggleExpanded = () => row.toggleExpanded();

  const CellChildren = React.Children.toArray(children).filter(child =>
    isComponentType(child, 'Cell'),
  );

  return (
    <>
      {React.Children.map(
        CellChildren,
        (child: ReactNode, colIndex: number) => {
          const { children, ...props } = (child as ReactElement)?.props;
          const isFirstCell = colIndex === 0;
          const cell = row.getVisibleCells()[colIndex];
          return (
            <Cell
              {...props}
              cellIndex={colIndex}
              isVisible={isRowVisible}
              isExpandable={isExpandable}
              disabled={disabled}
              depth={row.depth}
              // @ts-expect-error Cell is not deeply extended
              align={cell.column.columnDef.align}
            >
              {isFirstCell && isExpandable && (
                <ToggleExpandedIcon
                  isExpanded={isExpanded}
                  toggleExpanded={toggleExpanded}
                  aria-hidden={!isRowVisible}
                  disabled={disabled}
                  tabIndex={isRowVisible ? 0 : -1}
                />
              )}
              {children}
            </Cell>
          );
        },
      )}
    </>
  );
};

export default RowCellChildren;
