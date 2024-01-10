import React, { ReactElement, ReactNode } from 'react';

import { useTableContext } from '../TableContext/TableContext';
import ToggleExpandedIcon from '../ToggleExpandedIcon';
import { LGRowData } from '../useLeafyGreenTable';
import { getAreAncestorsExpanded } from '../utils/areAncestorsExpanded';

import { useRowContext } from './RowContext';
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
}: RowCellChildrenProps<T>) => {
  const { getParentRow } = useTableContext();
  const { disabled } = useRowContext();
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
          // FIXME:
          // eslint-disable-next-line no-unsafe-optional-chaining
          const { children, ...props } = (child as ReactElement)?.props;
          const isFirstCell = colIndex === 0;
          const cell = row.getVisibleCells()[colIndex];
          // Utilize cloneElement to pass through any Emotion data from the user's child
          return React.cloneElement(child as ReactElement, {
            ...props,
            cellIndex: colIndex,
            isVisible: isRowVisible,
            isExpandable: isExpandable,
            disabled,
            depth: row.depth,
            // @ts-expect-error Cell is not deeply extended to define the align prop
            align: cell.column.columnDef.align,
            children: (
              <>
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
              </>
            ),
          });
        },
      )}
    </>
  );
};

export default RowCellChildren;
