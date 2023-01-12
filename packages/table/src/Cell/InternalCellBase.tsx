import { cx } from '@leafygreen-ui/emotion';
import React, { PropsWithChildren } from 'react';
import { useTableContext } from '../TableContext';
import ToggleExpandedIcon from '../ToggleExpandedIcon/ToggleExpandedIcon';
import {
  alignmentStyles,
  baseStyles,
  depthPadding,
  cellContentContainerStyles,
} from './Cell.styles';
import { InternalCellBaseProps } from './Cell.types';

const InternalCellBase = ({
  children,
  className,
  cellIndex,
  depth = 0,
  toggleExpandedIconProps,
  ...rest
}: PropsWithChildren<InternalCellBaseProps>) => {
  const { columnAlignments } = useTableContext();
  const align = columnAlignments ? columnAlignments[cellIndex] : undefined;

  return (
    <td
      className={cx(
        baseStyles,
        {
          [alignmentStyles(align)]: !!columnAlignments && !!align,
        },
        className,
      )}
      {...rest}
    >
      <div
        className={cx(cellContentContainerStyles, {
          [depthPadding(depth)]: cellIndex === 0,
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
