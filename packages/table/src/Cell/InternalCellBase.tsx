import React, { forwardRef } from 'react';

import { cx } from '@leafygreen-ui/emotion';

import { LGIDS } from '../constants';

import {
  cellInnerStyles,
  getBaseStyles,
  getCellContainerStyles,
} from './Cell.styles';
import { InternalCellProps } from './Cell.types';

/**
 * @internal
 */
const InternalCellBase = forwardRef<HTMLTableCellElement, InternalCellProps>(
  (
    {
      children,
      className,
      contentClassName,
      align,
      ...rest
    }: InternalCellProps,
    fwdRref,
  ) => {
    return (
      <td
        data-lgid={LGIDS.cell}
        className={cx(getBaseStyles(), className)}
        ref={fwdRref}
        {...rest}
      >
        <div className={cx(getCellContainerStyles(align), contentClassName)}>
          <div className={cellInnerStyles()}>{children}</div>
        </div>
      </td>
    );
  },
);

InternalCellBase.displayName = 'InternalCellBase';

export default InternalCellBase;
