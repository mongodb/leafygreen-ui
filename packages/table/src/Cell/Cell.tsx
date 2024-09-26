import React from 'react';

import { cx } from '@leafygreen-ui/emotion';

import { LGIDS } from '../constants';
import { useRowContext } from '../Row/RowContext';

import {
  alignmentStyles,
  baseCellStyles,
  basicCellStyles,
  cellTransitionContainerStyles,
} from './Cell.styles';
import InternalCell from './InternalCell';
import { CellProps } from '.';

const Cell = ({
  className,
  contentClassName,
  align,
  children,
  ...rest
}: CellProps) => {
  const { isReactTable } = useRowContext();
  return (
    <>
      {!isReactTable && (
        <td
          data-lgid={LGIDS.cell}
          className={cx(baseCellStyles, basicCellStyles, className)}
          {...rest}
        >
          <div
            className={cx(
              cellTransitionContainerStyles,
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
