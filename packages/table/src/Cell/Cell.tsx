import React from 'react';
import { Transition } from 'react-transition-group';

import { cx } from '@leafygreen-ui/emotion';

import { useTableContext } from '../TableContext/TableContext';

import {
  alignmentStyles,
  baseCellStyles,
  cellContentContainerStyles,
  cellContentTransitionStyles,
  getCellPadding,
} from './Cell.styles';
import { CellProps } from '.';

const Cell = ({
  children,
  className,
  cellIndex,
  toggleExpandedIconProps,
  contentClassName,
  depth,
  isVisible = true,
  isExpandable = false,
  align,
  ...rest
}: CellProps) => {
  const isFirstCell = cellIndex === 0;
  const { table } = useTableContext();
  const isSelectable = !!table && !!table.hasSelectableRows;

  return (
    <td
      className={cx(
        baseCellStyles,
        {
          [getCellPadding({ depth, isExpandable, isSelectable })]: isFirstCell,
        },
        className,
      )}
      {...rest}
    >
      <Transition in={isVisible} timeout={0}>
        {state => (
          <div
            data-state={state}
            className={cx(
              cellContentContainerStyles,
              cellContentTransitionStyles[state],
              alignmentStyles(align),
              contentClassName,
            )}
          >
            {children}
          </div>
        )}
      </Transition>
    </td>
  );
};

Cell.propTypes = {};

export default Cell;
