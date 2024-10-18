import React from 'react';

import { cx } from '@leafygreen-ui/emotion';

import { useTableContext } from '../TableContext';

import { basicCellStyles, getCellEllipsisStyles } from './Cell.styles';
import InternalCell from './InternalCell';
import { CellProps } from '.';

const InternalCellWithoutRT = ({ children, className, ...rest }: CellProps) => {
  const { shouldTruncate = true } = useTableContext();

  return (
    <InternalCell className={cx(basicCellStyles(), className)} {...rest}>
      <div className={getCellEllipsisStyles(shouldTruncate)}>{children}</div>
    </InternalCell>
  );
};

InternalCellWithoutRT.displayName = 'InternalCellWithoutRT';

export default InternalCellWithoutRT;
