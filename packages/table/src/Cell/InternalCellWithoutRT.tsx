import React, { forwardRef } from 'react';

import { cx } from '@leafygreen-ui/emotion';

import { useTableContext } from '../TableContext';

import { getCellEllipsisStyles, getCellStyles } from './Cell.styles';
import InternalCell from './InternalCell';
import { InternalCellProps } from '.';

const InternalCellWithoutRT = forwardRef<
  HTMLTableCellElement,
  InternalCellProps
>(({ children, className, ...rest }: InternalCellProps, fwdRef) => {
  const { shouldTruncate = true } = useTableContext();

  return (
    <InternalCell
      ref={fwdRef}
      className={cx(getCellStyles(), className)}
      {...rest}
    >
      <div className={getCellEllipsisStyles(shouldTruncate)}>{children}</div>
    </InternalCell>
  );
});

InternalCellWithoutRT.displayName = 'InternalCellWithoutRT';

export default InternalCellWithoutRT;
