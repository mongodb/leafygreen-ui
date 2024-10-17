import React from 'react';

import { cx } from '@leafygreen-ui/emotion';

import { LGIDS } from '../constants';
import { useRowContext } from '../Row/RowContext';
import { useTableContext } from '../TableContext';
import ToggleExpandedIcon from '../ToggleExpandedIcon';

import {
  alignmentStyles,
  cellContainerStyles,
  cellInnerStyles,
  getBaseStyles,
  getCellEllipsisStyles,
  getCellPadding,
} from './Cell.styles';
import { InternalCellProps } from './Cell.types';

const InternalCell = ({
  children,
  className,
  contentClassName,
  align,
  cell,
  ...rest
}: InternalCellProps) => {
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
    <td
      data-lgid={LGIDS.cell}
      className={cx(
        getBaseStyles(),
        {
          [getCellPadding({ depth, isExpandable, isSelectable })]: isFirstCell,
        },
        className,
      )}
      {...rest}
    >
      <div
        className={cx(
          cellContainerStyles(),
          alignmentStyles(align),
          contentClassName,
        )}
      >
        <div className={cellInnerStyles()}>
          {isFirstCell && isExpandable && (
            <ToggleExpandedIcon
              isExpanded={isExpanded}
              toggleExpanded={toggleExpanded}
              disabled={disabled}
            />
          )}
          <div className={getCellEllipsisStyles(shouldTruncate)}>
            {children}
          </div>
        </div>
      </div>
    </td>
  );
};

InternalCell.displayName = 'InternalCell';

export default InternalCell;
