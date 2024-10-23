import React from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import { useRowContext } from '../Row/RowContext';
import { useTableContext } from '../TableContext';
import ToggleExpandedIcon from '../ToggleExpandedIcon';
import { LGRowData } from '../useLeafyGreenTable';

import { getCellEllipsisStyles, getCellStyles } from './Cell.styles';
import { InternalCellWithRTProps } from './Cell.types';
import InternalCell from './InternalCell';

const InternalCellWithRT = <T extends LGRowData>({
  children,
  className,
  contentClassName,
  align,
  cell,
  ...rest
}: InternalCellWithRTProps<T>) => {
  const { disabled } = useRowContext();
  const { isSelectable, shouldTruncate = true, isVirtual } = useTableContext();
  const { theme } = useDarkMode();
  const isFirstCell = (cell && cell.column.getIsFirstColumn()) || false;
  const row = cell.row;
  const isExpandable = row.getCanExpand();
  const isExpanded = row.getIsExpanded();
  const depth = row.depth;
  const toggleExpanded = () => row.toggleExpanded();

  return (
    <InternalCell
      className={cx(
        getCellStyles(
          depth,
          isExpandable,
          isSelectable,
          isVirtual,
          cell.column.getSize(),
        ),

        className,
      )}
      // TS error is ignored (and not expected) as it doesn't show up locally but interrupts build
      // @ts-ignore Cell types need to be extended or declared in the react-table namespace
      align={align || cell?.column.columnDef?.align}
      {...rest}
    >
      {isFirstCell && isExpandable && (
        <ToggleExpandedIcon
          isExpanded={isExpanded}
          toggleExpanded={toggleExpanded}
          disabled={disabled}
          theme={theme}
        />
      )}
      <div className={getCellEllipsisStyles(shouldTruncate, isVirtual)}>
        {children}
      </div>
    </InternalCell>
  );
};

InternalCellWithRT.displayName = 'InternalCellWithRT';

export default InternalCellWithRT;
