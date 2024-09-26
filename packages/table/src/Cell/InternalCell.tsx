import React, { useMemo, useRef } from 'react';
import PropTypes from 'prop-types';

import { css, cx } from '@leafygreen-ui/emotion';

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
  const {
    depth,
    isExpandable = false,
    toggleExpanded,
    isExpanded = false,
    disabled,
  } = useRowContext();
  const isFirstCell = (cell && cell.column.getIsFirstColumn()) || false;
  const { isSelectable } = useTableContext();
  // const isSelectable = !!table && !!table.hasSelectableRows; //TODO: move to context
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
            // [truncatedContentStyles]: true,
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
InternalCell.propTypes = {
  cellIndex: PropTypes.number,
  depth: PropTypes.number,
  isVisible: PropTypes.bool,
  isExpandable: PropTypes.bool,
};

export default InternalCell;
