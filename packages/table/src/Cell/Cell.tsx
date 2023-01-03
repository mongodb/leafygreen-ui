import { cx } from '@leafygreen-ui/emotion';
import { consoleOnce } from '@leafygreen-ui/lib';
import React, { PropsWithChildren } from 'react';
import { useTableContext } from '../TableContext';
import ToggleExpandIcon from '../ToggleExpandedIcon/ToggleExpandedIcon';
import { alignmentStyles, baseStyles, depthPadding, cellContentContainerStyles } from './styles';
import { CellProps } from './types';

const Cell = <T extends unknown>({
  children,
  className,
  cellIndex,
  cell,
  ...rest
}: PropsWithChildren<CellProps<T>>) => {
  const { columnAlignments } = useTableContext();
  const align =
    cellIndex && columnAlignments ? columnAlignments[cellIndex] : undefined;

  const shouldRenderArrow = cell?.row.getCanExpand() && cellIndex === 0;

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
        depthPadding(cell && cellIndex === 0 ? cell.row.depth : 0)
      )}>
        {shouldRenderArrow &&
          <ToggleExpandIcon
            isExpanded={!!cell && cell.row.getIsExpanded()}
            // this prop should be set by default if an arrow should render
            // @ts-expect-error
            toggleExpanded={cell?.row.getToggleExpandedHandler()}
          />
        }
        {children}
      </div>
    </td>
  );
};

export default Cell;
