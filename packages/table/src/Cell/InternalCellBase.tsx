import React, { PropsWithChildren, useEffect, useState } from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { HTMLElementProps } from '@leafygreen-ui/lib';

import { useTableContext } from '../TableContext/TableContext';
import ToggleExpandedIcon from '../ToggleExpandedIcon/ToggleExpandedIcon';

import {
  alignmentStyles,
  baseStyles,
  cellContentContainerStyles,
  depthPadding,
} from './Cell.styles';
import { InternalCellBaseProps } from './Cell.types';

const InternalCellBase = ({
  children,
  className,
  cellIndex,
  depth = 0,
  toggleExpandedIconProps,
  align: alignProp,
  ...rest
}: PropsWithChildren<InternalCellBaseProps>) => {
  const { columnAlignments } = useTableContext();
  const [align, setAlign] =
    useState<HTMLElementProps<'td'>['align']>(alignProp);

  useEffect(() => {
    if (columnAlignments !== undefined && cellIndex !== undefined) {
      setAlign(columnAlignments[cellIndex]);
    }
  }, [cellIndex, columnAlignments]);

  return (
    <td className={cx(baseStyles, className)} {...rest}>
      <div
        className={cx(cellContentContainerStyles, {
          [depthPadding(depth)]: cellIndex === 0,
          [alignmentStyles(align)]: !!align,
        })}
      >
        {!!toggleExpandedIconProps && (
          <ToggleExpandedIcon {...toggleExpandedIconProps} />
        )}
        {children}
      </div>
    </td>
  );
};

export default InternalCellBase;
