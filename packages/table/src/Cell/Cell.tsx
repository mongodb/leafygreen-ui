import React, { ForwardedRef } from 'react';

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
// This assertion has an interface that restores the original function signature to work with generics.
export const Cell = React.forwardRef(CellWithForwardRef) as CellComponentType;

Cell.displayName = 'Cell';

export default Cell;
