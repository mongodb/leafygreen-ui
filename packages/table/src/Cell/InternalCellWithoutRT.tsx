import React from 'react';

import { cx } from '@leafygreen-ui/emotion';

import { useTableContext } from '../TableContext';

import { getCellEllipsisStyles, getCellStyles } from './Cell.styles';
import InternalCell from './InternalCell';
import { InternalCellProps } from '.';

const InternalCellWithoutRT = ({
  children,
  className,
  ...rest
}: InternalCellProps) => {
  const { shouldTruncate = true } = useTableContext();

  return (
    <InternalCell className={cx(getCellStyles(), className)} {...rest}>
      <div className={getCellEllipsisStyles(shouldTruncate)}>{children}</div>
    </InternalCell>
  );
};

InternalCellWithoutRT.displayName = 'InternalCellWithoutRT';

export default InternalCellWithoutRT;
