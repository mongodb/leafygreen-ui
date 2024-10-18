import React from 'react';

import { cx } from '@leafygreen-ui/emotion';

import { LGIDS } from '../constants';

import {
  alignmentStyles,
  cellContainerStyles,
  cellInnerStyles,
  getBaseStyles,
} from './Cell.styles';
import { InternalCellProps } from './Cell.types';

const InternalCell = ({
  children,
  className,
  contentClassName,
  align,
  cell,
  ...rest
}: InternalCellProps) => {
  return (
    <td
      data-lgid={LGIDS.cell}
      className={cx(getBaseStyles(), className)}
      {...rest}
    >
      <div
        className={cx(
          cellContainerStyles(),
          alignmentStyles(align),
          contentClassName,
        )}
      >
        <div className={cellInnerStyles()}>{children}</div>
      </div>
    </td>
  );
};

InternalCell.displayName = 'InternalCell';

export default InternalCell;
