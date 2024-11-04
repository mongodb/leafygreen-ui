// @ts-nocheck
import React, { ForwardedRef, forwardRef } from 'react';
import PropTypes from 'prop-types';

import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { BaseFontSize } from '@leafygreen-ui/tokens';
import {
  bodyTypeScaleStyles,
  useUpdatedBaseFontSize,
} from '@leafygreen-ui/typography';

import { LGIDS } from '../constants';
import { TableContextProvider } from '../TableContext';
import { LGRowData } from '../useLeafyGreenTable';
import { LeafyGreenVirtualTable } from '../useLeafyGreenVirtualTable/useLeafyGreenVirtualTable.types';

import {
  baseStyles,
  // getVirtualDynamicStyles,
  getVirtualStyles,
  tableContainerStyles,
  themeStyles,
} from './Table.styles';
import { TableProps } from './Table.types';

// Inferred generic type from component gets used in place of `any`
const Table = forwardRef<HTMLDivElement, TableProps<any>>(
  <T extends LGRowData>(
    {
      children,
      className,
      shouldAlternateRowColor = false,
      shouldTruncate = true,
      baseFontSize: baseFontSizeProp,
      darkMode: darkModeProp,
      table,
      'data-lgid': lgidProp = LGIDS.root,
      ...rest
    }: TableProps<T>,
    containerRef: ForwardedRef<HTMLDivElement>,
  ) => {
    const baseFontSize: BaseFontSize = useUpdatedBaseFontSize(baseFontSizeProp);
    const { theme, darkMode } = useDarkMode(darkModeProp);
    //TODO: find a better way to do all these checks
    const isVirtual =
      table && (table as LeafyGreenVirtualTable<T>).virtual ? true : false;
    const virtualTable = isVirtual
      ? (table as LeafyGreenVirtualTable<T>)!.virtual
      : undefined;
    const virtualTableTotalSize = virtualTable
      ? virtualTable.getTotalSize()
      : 0;
    // TODO: look into scroll position instead of start position - diff PR
    const virtualTableStart = virtualTable
      ? virtualTable.getVirtualItems()[0]?.start
      : 0;
    const isSelectable = table ? table.hasSelectableRows : false;
    const measureElement = isVirtual
      ? (table as LeafyGreenVirtualTable<T>).virtual.measureElement
      : undefined;

    const numOfVirtualItems = virtualTable?.virtualItems.length;
    const startOfFirstVirtualItem = virtualTable?.virtualItems[0]?.start;
    const endOfLastVirtualItem =
      virtualTable?.virtualItems[virtualTable?.virtualItems.length - 1]?.end;
    const totalSizOfVirtualTable = virtualTable?.getTotalSize();

    const length = virtualTable?.virtualItems.length;
    const start = virtualTable?.virtualItems[0]?.start;
    const size = virtualTable?.virtualItems[0]?.size;
    const end =
      virtualTable?.virtualItems[virtualTable?.virtualItems.length - 1]?.end;
    const totalSize = virtualTable?.getTotalSize();

    // console.log({
    //   length,
    //   start,
    //   size,
    //   end,
    //   totalSize,
    // });

    return (
      <div
        ref={containerRef}
        className={cx(tableContainerStyles, className)}
        // allow select by keyboard to allow scroll by keyboard
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0}
      >
        <div
        // className={cx(getVirtualStyles(isVirtual, virtualTableTotalSize))}
        >
          <div
          // className={getVirtualDynamicStyles(isVirtual, virtualTableStart)}
          >
            <TableContextProvider
              shouldAlternateRowColor={shouldAlternateRowColor}
              darkMode={darkMode}
              isVirtual={isVirtual}
              isSelectable={isSelectable}
              measureElement={measureElement}
              shouldTruncate={shouldTruncate}
              length={length}
              start={start}
              size={size}
              end={end}
              totalSize={totalSize}
              numOfVirtualItems={numOfVirtualItems}
              startOfFirstVirtualItem={startOfFirstVirtualItem}
              endOfLastVirtualItem={endOfLastVirtualItem}
              totalSizOfVirtualTable={totalSizOfVirtualTable}
            >
              <table
                className={cx(
                  baseStyles,
                  themeStyles[theme],
                  bodyTypeScaleStyles[baseFontSize],
                )}
                data-lgid={lgidProp}
                {...rest}
              >
                {children}
              </table>
            </TableContextProvider>
          </div>
        </div>
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
