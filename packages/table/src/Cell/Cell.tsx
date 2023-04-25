import React from 'react';

import { css, cx } from '@leafygreen-ui/emotion';

import {
  alignmentStyles,
  baseCellStyles,
  basicCellStyles,
  cellContentContainerStyles,
  standardCellHeight,
} from './Cell.styles';
import { CellProps } from '.';

const Cell = ({ className, align, children, ...rest }: CellProps) => (
  <td className={cx(baseCellStyles, basicCellStyles, className)} {...rest}>
    <div
      className={cx(
        cellContentContainerStyles,
        css`
          min-height: ${standardCellHeight}px;
        `,
        alignmentStyles(align),
      )}
    >
      {children}
    </div>
  </td>
);

Cell.displayName = 'Cell';

export default Cell;
