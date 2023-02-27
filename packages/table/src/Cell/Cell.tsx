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
  depthPadding,
  hiddenSubRowStyles,
  subRowStyles,
} from './Cell.styles';
import { CellProps } from '.';

const Cell = <T extends unknown>({
  children,
  className,
  cellIndex,
  depth = 0,
  toggleExpandedIconProps,
  align: alignProp,
  cell,
  isSubRowCell,
  isRenderedSubRowCell,
  ...rest
}: PropsWithChildren<CellProps<T>>) => {
  const { columnAlignments, isExpandedRow, toggleExpandedRow } =
    useTableContext();
  const [align, setAlign] =
    useState<HTMLElementProps<'td'>['align']>(alignProp);

  useEffect(() => {
    if (columnAlignments !== undefined && cellIndex !== undefined) {
      setAlign(columnAlignments[cellIndex]);
    }
  }, [cellIndex, columnAlignments]);

  const shouldRenderArrow = cell && cell?.row.getCanExpand() && cellIndex === 0;

  return (
    <td
      className={cx(
        baseStyles,
        {
          [subRowStyles]: isSubRowCell,
          [hiddenSubRowStyles]: isSubRowCell && isRenderedSubRowCell !== true,
        },
        className,
      )}
      {...rest}
    >
      <div
        className={cx(cellContentContainerStyles, {
          [depthPadding(depth)]: cellIndex === 0,
          [alignmentStyles(align)]: !!align,
          [subRowStyles]: isSubRowCell,
          [hiddenSubRowStyles]: isSubRowCell && isRenderedSubRowCell !== true,
        })}
      >
        {isSubRowCell}
        {isRenderedSubRowCell}
        {shouldRenderArrow && (
          <ToggleExpandedIcon
            isExpanded={isExpandedRow(cell.row.id)}
            toggleExpanded={() => toggleExpandedRow(cell.row.id)}
            data-testid="lg-table-expand-icon-button"
          />
        )}
        {children}
      </div>
    </td>
  );
};

Cell.propTypes = {
  cell: PropTypes.any,
};

export default Cell;
