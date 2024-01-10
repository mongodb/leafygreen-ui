import React, { useRef } from 'react';
import { Transition } from 'react-transition-group';
import PropTypes from 'prop-types';

import { cx } from '@leafygreen-ui/emotion';

import { useTableContext } from '../TableContext/TableContext';

import {
  alignmentStyles,
  baseCellStyles,
  cellContentContainerStyles,
  cellContentTransitionStyles,
  getCellPadding,
} from './Cell.styles';
import { CellWithRTProps } from './Cell.types';

const CellWithRT = ({
  children,
  className,
  cellIndex,
  depth,
  isVisible = true,
  isExpandable = false,
  align,
  ...rest
}: CellWithRTProps) => {
  const isFirstCell = cellIndex === 0;
  const { table } = useTableContext();
  const isSelectable = !!table && !!table.hasSelectableRows;
  const transitionRef = useRef<HTMLElement | null>(null);

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
      <Transition in={isVisible} timeout={0} nodeRef={transitionRef}>
        {state => (
          <div
            data-state={state}
            className={cx(
              cellContentContainerStyles,
              cellContentTransitionStyles[state],
              alignmentStyles(align),
            )}
          >
            {children}
          </div>
        )}
      </Transition>
    </td>
  );
};

CellWithRT.displayName = 'Cell';
CellWithRT.propTypes = {
  cellIndex: PropTypes.number,
  depth: PropTypes.number,
  isVisible: PropTypes.bool,
  isExpandable: PropTypes.bool,
};

export default CellWithRT;
