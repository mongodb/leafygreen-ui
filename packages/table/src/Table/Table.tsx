import PropTypes from 'prop-types';
import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { BaseFontSize } from '@leafygreen-ui/tokens';
import {
  bodyTypeScaleStyles,
  useUpdatedBaseFontSize,
} from '@leafygreen-ui/typography';
import React, { PropsWithChildren } from 'react';
import TableContextProvider from '../TableContext/TableContext';
import { baseStyles, themeStyles } from './Table.styles';
import { TableProps } from './Table.types';

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
          className,
        )}
        {...rest}
      >
        {children}
      </table>
    </TableContextProvider>
  );
};

Table.propTypes = {
  darkMode: PropTypes.bool,
  baseFontSize: PropTypes.oneOf(Object.values(BaseFontSize)),
  shouldAlternateRowColor: PropTypes.bool,
};

export default Table;
