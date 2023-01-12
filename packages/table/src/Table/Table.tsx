import { cx } from '@leafygreen-ui/emotion';
import React, { PropsWithChildren } from 'react';
import TableContextProvider from '../TableContext';
import { TableProps } from './types';
import { baseStyles, themeStyles } from './styles';
import {
  bodyTypeScaleStyles,
  useUpdatedBaseFontSize,
} from '@leafygreen-ui/typography';
import { BaseFontSize } from '@leafygreen-ui/tokens';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

const Table = ({
  children,
  className,
  shouldAlternateRowColor = false,
  baseFontSize: baseFontSizeProp,
  darkMode: darkModeProp,
  ...rest
}: PropsWithChildren<TableProps>) => {
  const baseFontSize: BaseFontSize = useUpdatedBaseFontSize(baseFontSizeProp);
  const { theme, darkMode } = useDarkMode(darkModeProp);

  return (
    <TableContextProvider
      shouldAlternateRowColor={shouldAlternateRowColor}
      darkMode={darkMode}
    >
      <table
        className={cx(
          baseStyles,
          themeStyles[theme],
          bodyTypeScaleStyles[baseFontSize],
          className
        )}
        {...rest}
      >
        {children}
      </table>
    </TableContextProvider>
  );
};

export default Table;
