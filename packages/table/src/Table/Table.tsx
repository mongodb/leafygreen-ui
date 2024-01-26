import React, { ForwardedRef, forwardRef } from 'react';
import PropTypes from 'prop-types';

import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { BaseFontSize } from '@leafygreen-ui/tokens';
import {
  bodyTypeScaleStyles,
  useUpdatedBaseFontSize,
} from '@leafygreen-ui/typography';

import { TableContextProvider } from '../TableContext';
import { LGRowData } from '../useLeafyGreenTable';

import { baseStyles, tableContainerStyles, themeStyles } from './Table.styles';
import { TableProps } from './Table.types';

// Inferred generic type from component gets used in place of `any`
const Table = forwardRef<HTMLDivElement, TableProps<any>>(
  <T extends LGRowData>(
    {
      children,
      className,
      shouldAlternateRowColor = false,
      baseFontSize: baseFontSizeProp,
      darkMode: darkModeProp,
      table,
      disableAnimations = false,
      ...rest
    }: TableProps<T>,
    containerRef: ForwardedRef<HTMLDivElement>,
  ) => {
    const baseFontSize: BaseFontSize = useUpdatedBaseFontSize(baseFontSizeProp);
    const { theme, darkMode } = useDarkMode(darkModeProp);

    return (
      <div
        ref={containerRef}
        className={cx(tableContainerStyles, className)}
        // allow select by keyboard to allow scroll by keyboard
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0}
      >
        <TableContextProvider
          shouldAlternateRowColor={shouldAlternateRowColor}
          darkMode={darkMode}
          table={table}
          disableAnimations={disableAnimations}
        >
          <table
            className={cx(
              baseStyles,
              themeStyles[theme],
              bodyTypeScaleStyles[baseFontSize],
            )}
            {...rest}
          >
            {children}
          </table>
        </TableContextProvider>
      </div>
    );
  },
);

Table.propTypes = {
  darkMode: PropTypes.bool,
  baseFontSize: PropTypes.oneOf(Object.values(BaseFontSize)),
  shouldAlternateRowColor: PropTypes.bool,
};

Table.displayName = 'Table';

export default Table;
