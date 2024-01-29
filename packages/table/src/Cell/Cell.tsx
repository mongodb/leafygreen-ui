import React from 'react';

import { cx } from '@leafygreen-ui/emotion';

import { useTableContext } from '../TableContext';

import {
  alignmentStyles,
  baseCellStyles,
  basicCellStyles,
  cellTransitionContainerStyles,
  disableAnimationStyles,
} from './Cell.styles';
import { CellProps } from '.';

const Cell = ({
  className,
  contentClassName,
  align,
  children,
  ...rest
}: CellProps) => {
  const { disableAnimations } = useTableContext();
  return (
    <td className={cx(baseCellStyles, basicCellStyles, className)} {...rest}>
      <div
        className={cx(
          cellTransitionContainerStyles,
          alignmentStyles(align),
          { [disableAnimationStyles]: disableAnimations },
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
