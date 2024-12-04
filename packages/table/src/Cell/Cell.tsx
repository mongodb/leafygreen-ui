import React, { ForwardedRef } from 'react';
import PropTypes from 'prop-types';

import { LGRowData } from '../useLeafyGreenTable';

import { CellComponentType } from './Cell.types';
import InternalCellWithoutRT from './InternalCellWithoutRT';
import InternalCellWithRT from './InternalCellWithRT';
import { CellProps } from '.';

const CellWithForwardRef = <T extends LGRowData>(
  { children, cell: reactTableCell, ...rest }: CellProps<T>,
  ref: ForwardedRef<HTMLTableCellElement>,
) => {
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
};

// React.forwardRef can only work with plain function types, i.e. types with a single call signature and no other members.
// Asserts that `Cell` is of type `CellComponentType` which works with generics
export const Cell = React.forwardRef(CellWithForwardRef) as CellComponentType;

Cell.displayName = 'Cell';

export default Cell;

Cell.propTypes = {
  cell: PropTypes.object,
  align: PropTypes.oneOf(['left', 'right', 'center']),
  contentClassName: PropTypes.string,
} as any; // avoid inferred types from interfering;
