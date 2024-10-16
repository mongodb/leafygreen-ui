import React from 'react';

import { cx } from '@leafygreen-ui/emotion';

import { LGIDS } from '../constants';
import { useRowContext } from '../Row/RowContext';
import { useTableContext } from '../TableContext';

import {
  alignmentStyles,
  basicCellStyles,
  cellContainerStyles,
  getBaseStyles,
} from './Cell.styles';
import InternalCell from './InternalCell';
import { CellProps } from '.';

const Cell = ({
  className,
  contentClassName,
  align,
  children,
  cell,
  ...rest
}: CellProps) => {
  const { isReactTable } = useRowContext();
  const { shouldTruncate } = useTableContext();

  return (
    <>
      {!isReactTable && (
        <td
          data-lgid={LGIDS.cell}
          className={cx(getBaseStyles(), basicCellStyles, className)}
          {...rest}
        >
          <div
            className={cx(
              cellContainerStyles(shouldTruncate),
              alignmentStyles(align),
              contentClassName,
            )}
          >
            {children}
          </div>
        </td>
      )}

      {isReactTable && (
        <InternalCell
          {...rest}
          cell={cell}
          className={className}
          contentClassName={contentClassName}
        >
          {children}
        </InternalCell>
      )}
    </>
  );
};

Cell.displayName = 'Cell';

export default Cell;
