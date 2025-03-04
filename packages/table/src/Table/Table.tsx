import React, { ForwardedRef, forwardRef } from 'react';
import { useInView } from 'react-intersection-observer';

import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { BaseFontSize } from '@leafygreen-ui/tokens';
import { useUpdatedBaseFontSize } from '@leafygreen-ui/typography';

import { LGIDS } from '../constants';
import { TableContextProvider } from '../TableContext';
import { LGRowData } from '../useLeafyGreenTable';
import { LeafyGreenVirtualTable } from '../useLeafyGreenVirtualTable/useLeafyGreenVirtualTable.types';

import {
  getTableContainerStyles,
  getTableStyles,
  tableClassName,
} from './Table.styles';
import { TableProps, VerticalAlignment } from './Table.types';

// Inferred generic type from component gets used in place of `any`
const Table = forwardRef<HTMLDivElement, TableProps<any>>(
  <T extends LGRowData>(
    {
      table,
      children,
      className,
      verticalAlignment = VerticalAlignment.Top,
      shouldAlternateRowColor = false,
      shouldTruncate = true,
      baseFontSize: baseFontSizeProp,
      darkMode: darkModeProp,
      'data-lgid': lgidProp = LGIDS.root,
      ...rest
    }: TableProps<T>,
    containerRef: ForwardedRef<HTMLDivElement>,
  ) => {
    const baseFontSize: BaseFontSize = useUpdatedBaseFontSize(baseFontSizeProp);
    const { theme, darkMode } = useDarkMode(darkModeProp);

    const isVirtual = Boolean((table as LeafyGreenVirtualTable<T>)?.virtual);
    const virtualTable = isVirtual
      ? (table as LeafyGreenVirtualTable<T>).virtual
      : undefined;
    const isSelectable = table ? table.hasSelectableRows : false;

    // Helps to determine if the header is sticky
    const { ref, inView } = useInView({
      threshold: 0,
      initialInView: true,
    });

    return (
      <div
        ref={containerRef}
        className={cx(getTableContainerStyles(isVirtual), className)}
        // allow select by keyboard to allow scroll by keyboard
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0}
      >
        {/* Empty div used to track if the header is sticky */}
        <div ref={ref} />
        <TableContextProvider
          shouldAlternateRowColor={shouldAlternateRowColor}
          darkMode={darkMode}
          isVirtual={isVirtual}
          isSelectable={isSelectable}
          shouldTruncate={shouldTruncate}
          virtualTable={virtualTable}
          verticalAlignment={verticalAlignment}
        >
          <table
            className={cx(
              tableClassName,
              getTableStyles(theme, baseFontSize, isVirtual, shouldTruncate),
            )}
            data-lgid={lgidProp}
            data-is-sticky={!inView}
            {...rest}
          >
            {children}
          </table>
        </TableContextProvider>
      </div>
    );
  },
);

Table.displayName = 'Table';

export default Table;
