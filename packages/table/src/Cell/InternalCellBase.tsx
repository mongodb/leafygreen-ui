import React, { forwardRef } from 'react';

import { cx } from '@leafygreen-ui/emotion';

import { useTableContext } from '../TableContext';

import {
  cellInnerStyles,
  getBaseCellStyles,
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
    const { verticalAlignment, lgIds } = useTableContext();
    return (
      <td
        data-lgid={lgIds.cell}
        data-testid={lgIds.cell}
        className={cx(getBaseCellStyles(verticalAlignment), className)}
        ref={fwdRref}
        {...rest}
      >
        <div className={cx(getCellContainerStyles(align), contentClassName)}>
          <div className={cellInnerStyles}>{children}</div>
        </div>
      </td>
    );
  },
);

InternalCellBase.displayName = 'InternalCellBase';

export default InternalCellBase;
