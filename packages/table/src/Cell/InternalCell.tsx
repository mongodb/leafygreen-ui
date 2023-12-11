import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import { cx } from '@leafygreen-ui/emotion';
import { transitionDuration } from '@leafygreen-ui/tokens';

import { useTableContext } from '../TableContext/TableContext';
import AnimateHeight from '../utils/MyAnimateHeight';

import {
  alignmentStyles,
  baseCellStyles,
  cellContentContainerStyles,
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
      <AnimateHeight ref={transitionRef} isVisible={isVisible}>
        <div className={cx(cellContentContainerStyles, alignmentStyles(align))}>
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
