import React, { useMemo, useRef } from 'react';
import { Transition } from 'react-transition-group';
import PropTypes from 'prop-types';

import { cx } from '@leafygreen-ui/emotion';

import { useTableContext } from '../TableContext';

import {
  alignmentStyles,
  baseCellStyles,
  cellContentTransitionStateStyles,
  cellTransitionContainerStyles,
  disableAnimationStyles,
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
  isVisible = true,
  isExpandable = false,
  overflow,
  align,
  ...rest
}: InternalCellProps) => {
  const isFirstCell = cellIndex === 0;
  const { table, disableAnimations } = useTableContext();
  const isSelectable = !!table && !!table.hasSelectableRows;
  const transitionRef = useRef<HTMLElement | null>(null);
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
      className={cx(
        baseCellStyles,
        {
          [getCellPadding({ depth, isExpandable, isSelectable })]: isFirstCell,
        },
        className,
      )}
      {...rest}
    >
      <Transition in={isVisible} timeout={0} nodeRef={transitionRef}>
        {state => (
          <div
            data-state={state}
            ref={contentRef}
            className={cx(
              cellTransitionContainerStyles,
              cellContentTransitionStateStyles(contentHeight)[state],
              alignmentStyles(align),
              {
                [disableAnimationStyles]: disableAnimations,
                [truncatedContentStyles]: shouldTruncate,
              },
              contentClassName,
            )}
          >
            {children}
          </div>
        )}
      </Transition>
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
