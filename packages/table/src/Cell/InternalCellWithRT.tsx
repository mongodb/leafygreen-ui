import React from 'react';

import { cx } from '@leafygreen-ui/emotion';

import { useRowContext } from '../Row/RowContext';
import { useTableContext } from '../TableContext';
import ToggleExpandedIcon from '../ToggleExpandedIcon';

import { basicCellStyles, getCellEllipsisStyles } from './Cell.styles';
import { InternalCellWithRTProps } from './Cell.types';
import InternalCell from './InternalCell';

const InternalCellWithRT = ({
  children,
  className,
  contentClassName,
  align,
  cell,
  ...rest
}: InternalCellWithRTProps) => {
  const { disabled } = useRowContext();
  // TODO: log warning if cell is not passed to Cell
  const { isSelectable, shouldTruncate = true } = useTableContext();
  const isFirstCell = (cell && cell.column.getIsFirstColumn()) || false;
  const row = cell.row;
  const isExpandable = row.getCanExpand();
  const isExpanded = row.getIsExpanded();
  const depth = row.depth;
  const toggleExpanded = () => row.toggleExpanded();

  return (
    <InternalCell
      className={cx(
        basicCellStyles(depth, isExpandable, isSelectable),
        className,
      )}
      {...rest}
    >
      {isFirstCell && isExpandable && (
        <ToggleExpandedIcon
          isExpanded={isExpanded}
          toggleExpanded={toggleExpanded}
          disabled={disabled}
        />
      )}
      <div className={getCellEllipsisStyles(shouldTruncate)}>{children}</div>
    </InternalCell>
  );
};

InternalCellWithRT.displayName = 'InternalCellWithRT';

export default InternalCellWithRT;
