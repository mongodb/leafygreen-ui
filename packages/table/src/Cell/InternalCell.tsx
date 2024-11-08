import React from 'react';

import { cx } from '@leafygreen-ui/emotion';

import { LGIDS } from '../constants';
import { useTableContext } from '../TableContext';

import {
  cellInnerStyles,
  getBaseCellStyles,
  getCellContainerStyles,
} from './Cell.styles';
import { InternalCellProps } from './Cell.types';

const InternalCell = ({
  children,
  className,
  contentClassName,
  align,
  ...rest
}: InternalCellProps) => {
  const { verticalAlignment } = useTableContext();
  return (
    <td
      data-lgid={LGIDS.cell}
      className={cx(getBaseCellStyles(verticalAlignment), className)}
      {...rest}
    >
      <div className={cx(getCellContainerStyles(align), contentClassName)}>
        <div className={cellInnerStyles}>{children}</div>
      </div>
    </td>
  );
};

InternalCell.displayName = 'InternalCell';

export default InternalCell;
