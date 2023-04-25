import React from 'react';

import { css, cx } from '@leafygreen-ui/emotion';
import { spacing } from '@leafygreen-ui/tokens';

import {
  alignmentStyles,
  baseCellStyles,
  baseTableSidePadding,
  cellContentContainerStyles,
  getCellPadding,
} from './Cell.styles';
import { CellProps } from '.';

const Cell = ({ className, align, children, ...rest }: CellProps) => (
  <td
    className={cx(
      baseCellStyles,
      css`
        &:first-child {
          ${getCellPadding({
            depth: 0,
            isExpandable: false,
            isSelectable: false,
          })}
        }
        &:last-child {
          padding-right: ${baseTableSidePadding}px;
        }
      `,
      className,
    )}
    {...rest}
  >
    <div
      className={cx(
        cellContentContainerStyles,
        css`
          min-height: ${spacing[5] + spacing[2]}px;
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
