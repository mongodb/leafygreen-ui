import React from 'react';
import { Transition } from 'react-transition-group';

import { cx } from '@leafygreen-ui/emotion';

import { LGRowData } from '../useLeafyGreenTable';

import {
  baseCellStyles,
  cellContentContainerStyles,
  cellContentTransitionStyles,
  getCellPadding,
} from './Cell.styles';
import { CellProps } from '.';

const Cell = <T extends LGRowData>({
  children,
  className,
  cellIndex,
  toggleExpandedIconProps,
  contentClassName,
  depth,
  isVisible = true,
  isExpandable = false,
  isSelectable = false,
  ...rest
}: CellProps<T>) => {
  const isFirstCell = cellIndex === 0;

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
