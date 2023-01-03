import { cx } from '@leafygreen-ui/emotion';
import React, { PropsWithChildren, ReactElement, ReactNode } from 'react';
import { useTableContext } from '../TableContext';
import { baseStyles, zebraStyles, nestedBorderTopStyles, nestedBgStyles } from './styles';
import { RowProps } from './types';

const Row = <T extends unknown>({ children, className, row, ...rest }: PropsWithChildren<RowProps<T>>) => {
  const { shouldAlternateRowColor } = useTableContext();
  const isNestedRowParent = row && row.depth === 0 && row.getIsExpanded()
  const isNestedRowOrParent = row && (row.getIsExpanded() || row.depth > 0);

  return (
    <>
      <tr
        data-depth={row && row.depth}
        className={cx(
          baseStyles,
          {
            [zebraStyles]: shouldAlternateRowColor,
            [nestedBorderTopStyles]: isNestedRowParent,
            // [nestedBorderBottomStyles]: isLastNestedRow,
            [nestedBgStyles]: isNestedRowOrParent,
          },
          className,
        )}
        {...rest}
      >
        {React.Children.map(children, (child: ReactNode, index: number) => {
          return React.cloneElement(child as ReactElement, {
            cellIndex: index,
            ...(child as ReactElement).props,
          });
        })}
      </tr>
    </>
  );
};

export default Row;
