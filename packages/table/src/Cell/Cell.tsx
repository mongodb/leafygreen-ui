import React from 'react';

import { useRowContext } from '../Row/RowContext';

import InternalCell from './InternalCell';
import InternalCellWithoutRT from './InternalCellWithoutRT';
import { CellProps } from '.';

const Cell = ({ align, children, cell, ...rest }: CellProps) => {
  const { isReactTable } = useRowContext();

  // const isFirstCell = (cell && cell.column.getIsFirstColumn()) || false;
  // const row = cell && cell.row;
  // const isExpandable = cell && row ? row.getCanExpand() : false;
  // const isExpanded = cell && row ? row.getIsExpanded() : false;
  // const depth = cell && row ? row.depth : 0;
  // const toggleExpanded = () => (row ? row.toggleExpanded() : {});
  // const cellSize = cell ? cell.column.getSize() : 0;

  // TODO: can i combine these two?

  return (
    <>
      {!isReactTable && (
        <InternalCellWithoutRT {...rest}>{children}</InternalCellWithoutRT>
      )}

      {isReactTable && (
        <InternalCell {...rest} cell={cell}>
          {children}
        </InternalCell>
      )}
    </>
  );
};

Cell.displayName = 'Cell';

export default Cell;
