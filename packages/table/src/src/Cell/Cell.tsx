import React from 'react';

import { css, cx } from '@leafygreen-ui/emotion';

import {
  alignmentStyles,
  baseCellStyles,
  baseTableSidePadding,
  cellContentContainerStyles,
  cellContentTransitionStyles,
} from './Cell.styles';
import { CellProps } from '.';

const Cell = ({ className, align, children, ...rest }: CellProps) => (
  <td
    className={cx(
      baseCellStyles,
      css`
        padding-left: ${baseTableSidePadding}px;
      `,
      className,
    )}
    {...rest}
  >
    <div
      className={cx(
        cellContentContainerStyles,
        cellContentTransitionStyles['entered'],
        alignmentStyles(align),
      )}
    >
      {children}
    </div>
  </td>
);

Cell.displayName = 'Cell';

export default Cell;
