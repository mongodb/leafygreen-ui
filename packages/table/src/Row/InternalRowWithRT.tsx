import React, { ForwardedRef, forwardRef, useMemo } from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { useMergeRefs } from '@leafygreen-ui/hooks';
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

/**
 * Renders row data provided by `useReactTable`
 */
const InternalRowWithRT = forwardRef(
  <T extends LGRowData>(
    {
      children,
      className,
      row,
      virtualRow,
      disabled = false,
      ...rest
    }: InternalRowWithRTProps<T>,
    fwdRef: ForwardedRef<HTMLTableRowElement>,
  ) => {
    const { theme } = useDarkMode();
    const { measureElement, shouldAlternateRowColor } = useTableContext();
    const isOddVSRow = !!virtualRow && virtualRow.index % 2 !== 0;

    const isExpanded = row.getIsExpanded();
    const isSelected = row.getIsSelected();
    const isParentExpanded = row.getParentRow()
      ? row.getParentRow()?.getIsExpanded()
      : false;

    const contextValues = useMemo(() => {
      return {
        disabled,
        isReactTable: true,
      };
    }, [disabled]);

    return (
      <InternalRowBase
        className={cx(
          {
            [grayZebraRowStyles[theme]]:
              isOddVSRow && shouldAlternateRowColor && !isSelected,
            [zebraStyles[theme]]:
              !virtualRow && shouldAlternateRowColor && !isSelected,
            [selectedRowStyles[theme]]: isSelected && !disabled,
            [expandedContentParentStyles[theme]]:
              isExpanded || isParentExpanded,
          },
          className,
        )}
        data-selected={isSelected}
        data-expanded={isExpanded}
        id={`lg-table-row-${row.id}`}
        ref={useMergeRefs([fwdRef, measureElement])}
        data-index={virtualRow ? virtualRow!.index : ''}
        {...rest}
      >
        <RowContextProvider {...contextValues}>{children}</RowContextProvider>
      </InternalRowBase>
    );
  },
);

export default InternalRowWithRT;

InternalRowWithRT.displayName = 'InternalRowWithRT';
