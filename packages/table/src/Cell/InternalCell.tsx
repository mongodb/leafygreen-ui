import React, { useMemo, useRef } from 'react';
import PropTypes from 'prop-types';

import { css, cx } from '@leafygreen-ui/emotion';

import { LGIDS } from '../constants';
import { useTableContext } from '../TableContext';

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
  cellIndex,
  depth,
  isExpandable = false,
  overflow,
  align,
  ...rest
}: InternalCellProps) => {
  const isFirstCell = cellIndex === 0;
  const { table } = useTableContext();
  const isSelectable = !!table && !!table.hasSelectableRows;
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
