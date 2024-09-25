import React from 'react';

import { cx } from '@leafygreen-ui/emotion';

import { LGIDS } from '../constants';

import {
  alignmentStyles,
  baseCellStyles,
  basicCellStyles,
  cellTransitionContainerStyles,
} from './Cell.styles';
import { CellProps } from '.';

const Cell = ({
  className,
  contentClassName,
  align,
  children,
  ...rest
}: CellProps) => {
  return (
    <td
      data-lgid={LGIDS.cell}
      className={cx(baseCellStyles, basicCellStyles, className)}
      {...rest}
    >
      <div
        className={cx(
          cellTransitionContainerStyles,
          alignmentStyles(align),
          contentClassName,
        )}
      >
        {children}
      </div>
    </td>
  );
};

Cell.displayName = 'Cell';

export default Cell;
