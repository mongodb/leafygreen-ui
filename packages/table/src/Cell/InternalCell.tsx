import React, { useEffect, useMemo, useRef, useState } from 'react';
import AnimateHeight from 'react-animate-height';
import { Transition } from 'react-transition-group';
import PropTypes from 'prop-types';

import { cx } from '@leafygreen-ui/emotion';
import { transitionDuration } from '@leafygreen-ui/tokens';

import { useTableContext } from '../TableContext/TableContext';

import {
  alignmentStyles,
  baseCellStyles,
  cellContentContainerStyles,
  cellContentTransitionStyles,
  getCellPadding,
} from './Cell.styles';
import { InternalCellProps } from './Cell.types';

const InternalCell = ({
  children,
  className,
  cellIndex,
  depth,
  isVisible = true,
  isExpandable = false,
  align,
  ...rest
}: InternalCellProps) => {
  const isFirstCell = cellIndex === 0;
  const { table } = useTableContext();
  const isSelectable = !!table && !!table.hasSelectableRows;
  const transitionRef = useRef<HTMLDivElement | null>(null);

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
      <AnimateHeight
        duration={transitionDuration.default}
        easing="ease-in-out"
        ref={transitionRef}
        height={isVisible ? 'auto' : 0}
      >
        <div
          className={cx(
            cellContentContainerStyles,
            // cellContentTransitionStyles(contentHeight)[state],
            alignmentStyles(align),
          )}
        >
          {children}
        </div>
      </AnimateHeight>
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
