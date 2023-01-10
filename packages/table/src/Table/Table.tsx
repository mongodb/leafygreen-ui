import { cx } from '@leafygreen-ui/emotion';
import React, { PropsWithChildren } from 'react';
import TableContextProvider from '../TableContext';
import { TableProps } from './types';
import { baseStyles } from './styles';
import {
  bodyTypeScaleStyles,
  useUpdatedBaseFontSize,
} from '@leafygreen-ui/typography';
import { BaseFontSize } from '@leafygreen-ui/tokens';

const Table = ({
  children,
  className,
  shouldAlternateRowColor = false,
  hasSelectableRows = false,
  onSelectAllRows,
  baseFontSize: baseFontSizeProp,
  ...rest
}: PropsWithChildren<TableProps>) => {
  const baseFontSize: BaseFontSize = useUpdatedBaseFontSize(baseFontSizeProp);

  return (
    <TableContextProvider
      shouldAlternateRowColor={shouldAlternateRowColor}
      hasSelectableRows={hasSelectableRows}
      onSelectAllRows={onSelectAllRows}
    >
      <table
        className={cx(baseStyles, bodyTypeScaleStyles[baseFontSize], className)}
        {...rest}
      >
        {children}
      </table>
    </TableContextProvider>
  );
};

export default Table;
