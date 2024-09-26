import React, { useCallback, useMemo } from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import { useTableContext } from '../TableContext';
import { LGRowData } from '../useLeafyGreenTable';

import InternalRowBase from './InternalRowBase';
import {
  expandedContentParentStyles,
  grayZebraRowStyles,
  selectedRowStyles,
  zebraStyles,
} from './Row.styles';
import { InternalRowWithRTProps } from './Row.types';
import { RowContextProvider } from './RowContext';
// import { useRowContext } from './RowContext';

/**
 * Renders row data provided by `useReactTable`
 */
const InternalRowWithRT = <T extends LGRowData>({
  children,
  className,
  row,
  virtualRow,
  disabled = false,
  ...rest
}: InternalRowWithRTProps<T>) => {
  const { theme } = useDarkMode();
  const { measureElement, shouldAlternateRowColor } = useTableContext();
  const isOddVSRow = !!virtualRow && virtualRow.index % 2 !== 0;

  const isExpanded = row.getIsExpanded();
  const isSelected = row.getIsSelected();
  const isParentExpanded = row.getParentRow()
    ? row.getParentRow()?.getIsExpanded()
    : false;
  const isExpandable = row.getCanExpand();
  const depth = row.depth;

  const toggleExpanded = useCallback(() => row.toggleExpanded(), []); // Empty dependency array, so the function is only created once

  const contextValues = useMemo(() => {
    return {
      disabled,
      depth,
      isExpanded,
      isExpandable,
      toggleExpanded,
      isReactTable: true,
    };
  }, [depth, disabled, isExpandable, isExpanded, toggleExpanded]);

  // console.log(`🪼rerender: ${row.id} ${depth}`);

  return (
    <InternalRowBase
      className={cx(
        {
          [grayZebraRowStyles[theme]]:
            isOddVSRow && shouldAlternateRowColor && !isSelected,
          [zebraStyles[theme]]:
            !virtualRow && shouldAlternateRowColor && !isSelected,
          [selectedRowStyles[theme]]: isSelected && !disabled,
          [expandedContentParentStyles[theme]]: isExpanded || isParentExpanded,
        },
        className,
      )}
      data-selected={isSelected}
      data-expanded={isExpanded}
      id={`lg-table-row-${row.id}`}
      ref={node => {
        if (measureElement) measureElement(node); // can this be added to table context?
      }}
      data-index={virtualRow ? virtualRow!.index : ''}
      {...rest}
    >
      <RowContextProvider {...contextValues}>{children}</RowContextProvider>
      {/* <RowCellChildren row={row}>{children}</RowCellChildren> */}
    </InternalRowBase>
  );
};

export default InternalRowWithRT;
