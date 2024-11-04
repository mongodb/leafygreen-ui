import React, { forwardRef } from 'react';

import { cx } from '@leafygreen-ui/emotion';

import { useTableContext } from '../TableContext';

import { getCellEllipsisStyles, getCellStyles } from './Cell.styles';
import InternalCellBase from './InternalCellBase';
import { InternalCellProps } from '.';

/**
 * @internal
 */
const InternalCellWithoutRT = forwardRef<
  HTMLTableCellElement,
  InternalCellProps
>(({ children, className, ...rest }: InternalCellProps, fwdRef) => {
  const { shouldTruncate = true } = useTableContext();

  return (
    <InternalCellBase
      ref={fwdRef}
      className={cx(getCellStyles(), className)}
      {...rest}
    >
      <div className={getCellEllipsisStyles(shouldTruncate)}>{children}</div>
    </InternalCellBase>
  );
});

InternalCellWithoutRT.displayName = 'InternalCellWithoutRT';

export default InternalCellWithoutRT;
