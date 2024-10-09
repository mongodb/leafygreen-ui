import React, { useMemo, useRef } from 'react';

import { cx } from '@leafygreen-ui/emotion';

import { LGIDS } from '../constants';
import { useRowContext } from '../Row/RowContext';
import { useTableContext } from '../TableContext';
import ToggleExpandedIcon from '../ToggleExpandedIcon';

import {
  alignmentStyles,
  baseCellStyles,
  cellTransitionContainerStyles,
  getCellPadding,
  standardCellHeight,
  truncatedContentStyles,
} from './Cell.styles';
import { CellOverflowBehavior, InternalCellProps } from './Cell.types';

const InternalCell = ({
  children,
  className,
  contentClassName,
  overflow,
  align,
  cell,
  ...rest
}: InternalCellProps) => {
  const { disabled } = useRowContext();
  // TODO: log warning if cell is not passed to Cell
  const { isSelectable } = useTableContext();
  const isFirstCell = (cell && cell.column.getIsFirstColumn()) || false;
  const row = cell.row;
  const isExpandable = row.getCanExpand();
  const isExpanded = row.getIsExpanded();
  const depth = row.depth;
  const toggleExpanded = () => row.toggleExpanded();
  const contentRef = useRef<HTMLDivElement>(null);

  const contentHeight = standardCellHeight;
  const scrollHeight = contentRef.current
    ? contentRef.current?.scrollHeight
    : 0;
  const shouldTruncate = useMemo(() => {
    return (
      overflow === CellOverflowBehavior.Truncate && scrollHeight > contentHeight
    );
  }, [contentHeight, overflow, scrollHeight]);

  return (
    <td
      data-lgid={LGIDS.cell}
      className={cx(
        baseCellStyles,
        {
          [getCellPadding({ depth, isExpandable, isSelectable })]: isFirstCell,
        },
        className,
      )}
      {...rest}
    >
      <div
        ref={contentRef}
        className={cx(
          cellTransitionContainerStyles,
          alignmentStyles(align),
          {
            [truncatedContentStyles]: shouldTruncate,
          },
          contentClassName,
        )}
      >
        {isFirstCell && isExpandable && (
          <ToggleExpandedIcon
            isExpanded={isExpanded}
            toggleExpanded={toggleExpanded}
            disabled={disabled}
          />
        )}
        {children}
      </div>
    </td>
  );
};

InternalCell.displayName = 'Cell';

export default InternalCell;
