import { cx } from '@leafygreen-ui/emotion';
import { consoleOnce } from '@leafygreen-ui/lib';
import React, { PropsWithChildren } from 'react';
import { useTableContext } from '../TableContext';
import ToggleExpandedIcon from '../ToggleExpandedIcon/ToggleExpandedIcon';
import { alignmentStyles, baseStyles, depthPadding, cellContentContainerStyles } from './styles';
import { InternalCellBaseProps } from './types';

const InternalCellBase = ({
  children,
  className,
  cellIndex,
  depth,
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
      <div className={cx(
        cellContentContainerStyles,
        depthPadding(cellIndex === 0 ? depth : 0)
      )}>
        {shouldRenderArrow && <ToggleExpandedIcon {...toggleExpandedIconProps} />}
        {children}
      </div>
    </td>
  );
};

export default InternalCellBase;
