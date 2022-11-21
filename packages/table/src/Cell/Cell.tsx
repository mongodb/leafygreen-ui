import { cx } from '@leafygreen-ui/emotion';
import React, { PropsWithChildren } from 'react';
import { useTableContext } from '../TableContext';
import { alignmentStyles, baseStyles } from './styles';
import { CellProps } from './types';

const Cell = ({
  children,
  className,
  cellIndex,
  ...rest
}: PropsWithChildren<CellProps>) => {
  const { columnAlignments } = useTableContext();
  const align =
    cellIndex && columnAlignments ? columnAlignments[cellIndex] : undefined;

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
      {children}
    </td>
  );
};

export default Cell;
