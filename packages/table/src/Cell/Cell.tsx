import React from 'react';

import { LGRowData } from '../useLeafyGreenTable';

import InternalCellWithoutRT from './InternalCellWithoutRT';
import InternalCellWithRT from './InternalCellWithRT';
import { CellProps } from '.';

const Cell = <T extends LGRowData>({
  children,
  cell: reactTableCell,
  ...rest
}: CellProps<T>) => {
  return (
    <>
      {reactTableCell ? (
        <InternalCellWithRT {...rest} cell={reactTableCell}>
          {children}
        </InternalCellWithRT>
      ) : (
        <InternalCellWithoutRT {...rest}>{children}</InternalCellWithoutRT>
      )}
    </>
  );
};

Cell.displayName = 'Cell';

export default Cell;
