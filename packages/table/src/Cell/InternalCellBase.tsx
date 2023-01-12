import { cx } from '@leafygreen-ui/emotion';
import { consoleOnce } from '@leafygreen-ui/lib';
import React, { PropsWithChildren } from 'react';
import { useTableContext } from '../TableContext';
import ToggleExpandedIcon from '../ToggleExpandedIcon/ToggleExpandedIcon';
import {
  alignmentStyles,
  baseStyles,
  depthPadding,
  cellContentContainerStyles,
} from './styles';
import { InternalCellBaseProps } from './types';

const InternalCellBase = ({
  children,
  className,
  cellIndex,
  depth = 0,
  shouldRenderArrow,
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
        {shouldRenderArrow && (
          <ToggleExpandedIcon {...toggleExpandedIconProps} />
        )}
        {children}
      </div>
    </td>
  );
};

export default InternalCellBase;
