import React, { ForwardedRef } from 'react';
import PropTypes from 'prop-types';

import { LGRowData } from '../useLeafyGreenTable';
import { forwardRefWithGenerics } from '../utils/genericHelpers';

import InternalCellWithoutRT from './InternalCellWithoutRT';
import InternalCellWithRT from './InternalCellWithRT';
import { CellProps } from '.';

const Cell = forwardRefWithGenerics(function Cell<T extends LGRowData>(
  { children, cell: reactTableCell, ...rest }: CellProps<T>,
  ref: ForwardedRef<HTMLTableCellElement>,
) {
  return (
    <>
      {reactTableCell ? (
        <InternalCellWithRT ref={ref} {...rest} cell={reactTableCell}>
          {children}
        </InternalCellWithRT>
      ) : (
        <InternalCellWithoutRT ref={ref} {...rest}>
          {children}
        </InternalCellWithoutRT>
      )}
    </>
  );
});

export default Cell;

// @ts-expect-error - propTypes are not included in the type signature for forwardRefWithGenerics
Cell.propTypes = {
  cell: PropTypes.object,
  align: PropTypes.oneOf(['left', 'right', 'center']),
  contentClassName: PropTypes.string,
};
