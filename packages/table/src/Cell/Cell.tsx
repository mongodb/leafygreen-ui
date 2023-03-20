import React from 'react';
import PropTypes from 'prop-types';

import { cx } from '@leafygreen-ui/emotion';

import { LGRowData } from '../useLeafygreenTable';

import { baseStyles, cellContentContainerStyles } from './Cell.styles';
import { CellProps } from '.';

const Cell = <T extends LGRowData>({
  children,
  className,
  cellIndex,
  toggleExpandedIconProps,
  cell,
  contentClassName,
  ...rest
}: CellProps<T>) => {
  return (
    <td className={cx(baseStyles, className)} {...rest}>
      <div className={cx(cellContentContainerStyles, contentClassName)}>
        {children}
      </div>
    </td>
  );
};

Cell.propTypes = {
  cell: PropTypes.any,
};

export default Cell;
