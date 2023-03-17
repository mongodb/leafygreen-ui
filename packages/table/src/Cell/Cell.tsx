import React, { PropsWithChildren, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { cx } from '@leafygreen-ui/emotion';
import { HTMLElementProps } from '@leafygreen-ui/lib';

import { useTableContext } from '../TableContext/TableContext';
import ToggleExpandedIcon from '../ToggleExpandedIcon/ToggleExpandedIcon';

import {
  alignmentStyles,
  baseStyles,
  cellContentContainerStyles,
  hiddenSubRowStyles,
  subRowStyles,
} from './Cell.styles';
import { CellProps } from '.';

const Cell = <T extends unknown>({
  children,
  className,
  cellIndex,
  toggleExpandedIconProps,
  cell,
  contentClassName,
  isSubRowCell,
  isRenderedSubRowCell,
  ...rest
}: PropsWithChildren<CellProps<T>>) => {

  return (
    <td
      className={cx(
        baseStyles,
        className,
      )}
      {...rest}
    >
      <div
        className={cx(
          cellContentContainerStyles,
          contentClassName,
        )}
      >
        {children}
      </div>
    </td>
  );
};

Cell.propTypes = {
  cell: PropTypes.any,
};

export default Cell;
