import React from 'react';

import { LGRowData } from '../useLeafyGreenTable';

import InternalCellWithoutRT from './InternalCellWithoutRT';
import InternalCellWithRT from './InternalCellWithRT';
import { CellProps } from '.';

const Cell = <T extends LGRowData>({
  children,
  cell,
  ...rest
}: CellProps<T>) => {
  return (
    <>
      {!cell && (
        <InternalCellWithoutRT {...rest}>{children}</InternalCellWithoutRT>
      )}

      {cell && (
        <InternalCellWithRT {...rest} cell={cell}>
          {children}
        </InternalCellWithRT>
      )}
    </>
  );
};

Cell.displayName = 'Cell';

export default Cell;
