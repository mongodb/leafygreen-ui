import React, { ForwardedRef, forwardRef, useRef } from 'react';
import PropTypes from 'prop-types';

import { cx } from '@leafygreen-ui/emotion';
import { useForwardedRef } from '@leafygreen-ui/hooks';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { BaseFontSize } from '@leafygreen-ui/tokens';
import {
  bodyTypeScaleStyles,
  useUpdatedBaseFontSize,
} from '@leafygreen-ui/typography';

import { LGIDS } from '../constants';
import { TableContextProvider } from '../TableContext';
import { LGRowData } from '../useLeafyGreenTable';

// import { LeafyGreenVirtualTable } from '../useLeafyGreenVirtualTable/useLeafyGreenVirtualTable.types';
import {
  baseStyles,
  // getTableContainerStyles,
  tableContainerStyles,
  themeStyles,
} from './Table.styles';
import { TableProps } from './Table.types';

// const adjustTableHeight = (tableRef, virtualHeight) => {
//   if (!tableRef.current) return;

//   // calculate the height for the pseudo element after the table
//   const existingPseudoElement = window.getComputedStyle(
//     tableRef.current,
//     '::after',
//   );
//   const existingPseudoHeight = parseFloat(existingPseudoElement.height) || 0;
//   const tableHeight = tableRef.current.clientHeight - existingPseudoHeight;
//   const pseudoHeight = Math.max(virtualHeight - tableHeight, 0);
//   document.documentElement.style.setProperty(
//     '--pseudo-height',
//     `${pseudoHeight}px`,
//   );
//   return pseudoHeight;
// };

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
      'data-lgid': lgidProp = LGIDS.root,
      ...rest
    }: TableProps<T>,
    containerRef: ForwardedRef<HTMLDivElement>,
  ) => {
    const baseFontSize: BaseFontSize = useUpdatedBaseFontSize(baseFontSizeProp);
    const { theme, darkMode } = useDarkMode(darkModeProp);
    // const isVirtual = !!(table as LeafyGreenVirtualTable<T>)!.virtual ?? false;
    // const virtualTable = (table as LeafyGreenVirtualTable<T>)!.virtual;
    // console.log({ isVirtual });

    const parentRef = useForwardedRef(containerRef, null);
    const tableRef = useRef<HTMLTableElement>(null);
    // const [isScrollNearBottom, setIsScrollNearBottom] = useState(false);

    // const virtualizer = table.virtual;

    // const virtualItems = virtualizer.getVirtualItems();
    // const virtualSize = virtualizer.getTotalSize();

    // // callback to adjust the height of the pseudo element
    // const handlePseudoResize = useCallback(() => {
    //   return adjustTableHeight(tableRef, virtualSize);
    // }, [tableRef, virtualSize]);

    // // callback to handle scrolling, checking if we are near the bottom
    // const handleScroll = useCallback(() => {
    //   if (parentRef.current) {
    //     const scrollPosition = parentRef.current?.scrollTop;
    //     const visibleHeight = parentRef.current?.clientHeight;
    //     setIsScrollNearBottom(
    //       scrollPosition > virtualSize * 0.95 - visibleHeight,
    //     );
    //   }
    // }, [parentRef, virtualSize]);

    // add an event listener on the scrollable parent container and resize the
    // pseudo element whenever the table renders with new data
    // useEffect(() => {
    //   const scrollable = parentRef.current;
    //   if (scrollable) scrollable.addEventListener('scroll', handleScroll);
    //   handlePseudoResize();

    //   return () => {
    //     if (scrollable) scrollable.removeEventListener('scroll', handleScroll);
    //   };
    // }, [handleScroll, handlePseudoResize]);

    // if we are near the bottom of the table, resize the pseudo element each time
    // the length of virtual items changes (which is effectively the number of table
    // rows rendered to the DOM). This ensures we don't scroll too far or too short.
    // useEffect(() => {
    //   if (isScrollNearBottom) handlePseudoResize();
    // }, [isScrollNearBottom, virtualItems.length, handlePseudoResize]);

    return (
      <div
        ref={parentRef}
        className={cx(
          tableContainerStyles,
          // getTableContainerStyles(isVirtual, table.virtual || {}),
          className,
        )}
        // allow select by keyboard to allow scroll by keyboard
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0}
      >
        {/* <div
          style={{
            position: 'relative',
            height: `${virtualTable.getTotalSize()}px`,
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              transform: `translateY(${
                virtualTable.getVirtualItems()[0]?.start ?? 0
              }px)`,
            }}
          > */}
        {/* <div style={{ position: 'relative', height: `${virtualSize}px` }}> */}
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
            data-lgid={lgidProp}
            ref={tableRef}
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
