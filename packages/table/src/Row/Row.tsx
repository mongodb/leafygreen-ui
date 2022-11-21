import { cx } from '@leafygreen-ui/emotion';
import React, { PropsWithChildren, ReactElement, ReactNode } from 'react';
import { useTableContext } from '../TableContext';
import { baseStyles, zebraStyles } from './styles';
import { RowProps } from './types';

const Row = ({ children, className, ...rest }: PropsWithChildren<RowProps>) => {
  const { shouldAlternateRowColor } = useTableContext();

  return (
    <tr
      className={cx(
        baseStyles,
        {
          [zebraStyles]: shouldAlternateRowColor,
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
  );
};

export default Row;
