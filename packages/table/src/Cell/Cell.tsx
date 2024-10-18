import React from 'react';

import { useRowContext } from '../Row/RowContext';
import { LGRowData } from '../useLeafyGreenTable';

import InternalCellWithoutRT from './InternalCellWithoutRT';
import InternalCellWithRT from './InternalCellWithRT';
import { CellProps } from '.';

const Cell = <T extends LGRowData>({
  children,
  cell,
  ...rest
}: CellProps<T>) => {
  const { isReactTable } = useRowContext();

  return (
    <>
      {!isReactTable && (
        <InternalCellWithoutRT {...rest}>{children}</InternalCellWithoutRT>
      )}

      {isReactTable && (
        <InternalCellWithRT {...rest} cell={cell}>
          {children}
        </InternalCellWithRT>
      )}
    </>
  );
};

Cell.displayName = 'Cell';

export default Cell;
