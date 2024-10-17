import React from 'react';

import { cx } from '@leafygreen-ui/emotion';

import { LGIDS } from '../constants';
import { useTableContext } from '../TableContext';

import {
  alignmentStyles,
  basicCellStyles,
  cellContainerStyles,
  getBaseStyles,
  getCellEllipsisStyles,
} from './Cell.styles';
import { CellProps } from '.';

const InternalCellWithoutRT = ({
  className,
  contentClassName,
  align,
  children,
  cell,
  ...rest
}: CellProps) => {
  const { shouldTruncate = true } = useTableContext();

  return (
    <td
      data-lgid={LGIDS.cell}
      className={cx(getBaseStyles(), basicCellStyles, className)}
      {...rest}
    >
      <div
        className={cx(
          cellContainerStyles(),
          alignmentStyles(align), // TODO: do we need this?
          contentClassName,
        )}
      >
        <div className={getCellEllipsisStyles(shouldTruncate)}>{children}</div>
      </div>
    </td>
  );
};

InternalCellWithoutRT.displayName = 'InternalCellWithoutRT';

export default InternalCellWithoutRT;
