import React from 'react';

import { cx } from '@leafygreen-ui/emotion';

import {
  alignmentStyles,
  baseCellStyles,
  basicCellStyles,
  cellContentContainerStyles,
} from './Cell.styles';
import { CellProps } from '.';

const Cell = ({ className, align, children, ...rest }: CellProps) => (
  <td className={cx(baseCellStyles, basicCellStyles, className)} {...rest}>
    <div className={cx(cellContentContainerStyles, alignmentStyles(align))}>
      {children}
    </div>
  </td>
);

Cell.displayName = 'Cell';

export default Cell;
