import React from 'react';

import { cx } from '@leafygreen-ui/emotion';

import { useTableContext } from '../TableContext';

import {
  alignmentStyles,
  baseCellStyles,
  basicCellStyles,
  cellContentContainerStyles,
  disableAnimationStyles,
} from './Cell.styles';
import { CellProps } from '.';

const Cell = ({ className, align, children, ...rest }: CellProps) => {
  const { disableAnimations } = useTableContext();
  return (
    <td className={cx(baseCellStyles, basicCellStyles, className)} {...rest}>
      <div
        className={cx(
          cellContentContainerStyles,
          { [disableAnimationStyles]: disableAnimations },
          alignmentStyles(align),
        )}
      >
        {children}
      </div>
    </td>
  );
};

Cell.displayName = 'Cell';

export default Cell;
