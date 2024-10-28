import React, { ForwardedRef } from 'react';

import { LGRowData } from '../useLeafyGreenTable';

import { CellComponentType } from './Cell.types';
import InternalCellWithoutRT from './InternalCellWithoutRT';
import InternalCellWithRT from './InternalCellWithRT';
import { CellProps } from '.';

const CellWithForwardRef = <T extends LGRowData>(
  { children, cell, ...rest }: CellProps<T>,
  ref: ForwardedRef<HTMLTableCellElement>,
) => {
  return (
    <>
      {!cell && (
        <InternalCellWithoutRT ref={ref} {...rest}>
          {children}
        </InternalCellWithoutRT>
      )}

      {cell && (
        <InternalCellWithRT ref={ref} {...rest} cell={cell}>
          {children}
        </InternalCellWithRT>
      )}
    </>
  );
};

export const Cell = React.forwardRef(CellWithForwardRef) as CellComponentType;

Cell.displayName = 'Cell';

export default Cell;
