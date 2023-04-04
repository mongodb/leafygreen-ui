import React, { ReactElement, ReactNode } from 'react';

import InternalCell from '../Cell/InternalCell';
import { useTableContext } from '../TableContext/TableContext';
import ToggleExpandedIcon from '../ToggleExpandedIcon';
import { LGRowData } from '../useLeafyGreenTable';
import { getAreAncestorsExpanded } from '../utils/areAncestorsExpanded';

import { RowProps } from '.';

type RowCellChildrenProps<T extends LGRowData> = Required<
  Pick<RowProps<T>, 'row'>
> &
  Pick<RowProps<T>, 'disabled' | 'children'>;

/**
 * Renders row cells provided by `useReactTable`
 */
const RowCellChildren = <T extends LGRowData>({
  row,
  children: CellChildren,
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

  return (
    <>
      {React.Children.map(
        CellChildren,
        (child: ReactNode, colIndex: number) => {
          const { children, ...props } = (child as ReactElement)?.props;
          const isFirstCell = colIndex === 0;
          const cell = row.getVisibleCells()[colIndex];
          return (
            <InternalCell
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
            </InternalCell>
          );
        },
      )}
    </>
  );
};

export default RowCellChildren;
