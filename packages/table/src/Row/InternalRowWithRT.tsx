import React, { useMemo } from 'react';
import isEqual from 'react-fast-compare';

import { useMergeRefs } from '@leafygreen-ui/hooks';

import { LGRowData } from '../useLeafyGreenTable';

import InternalRowBase from './InternalRowBase';
import { getRowWithRTStyles } from './Row.styles';
import { InternalRowWithRTProps, RowComponentWithRTType } from './Row.types';
import { RowContextProvider } from './RowContext';

/**
 * Renders row data provided by `useReactTable`
 *
 * @internal
 */
const InternalRowWithRT = <T extends LGRowData>({
  children,
  className,
  row,
  virtualRow,
  disabled = false,
  shouldAlternateRowColor,
  theme,
  measureElement,
  isExpanded,
  isParentExpanded,
  isSelected,
  rowRef,
  shouldMemoizeRows: _shouldMemoizeRows,
  ...rest
}: InternalRowWithRTProps<T>) => {
  // We need to use the virtualRow index instead of nth-of-type because the rows are not static
  const isOddVSRow = !!virtualRow && virtualRow.index % 2 !== 0;

  const isExpandable = row.getCanExpand();
  const depth = row.depth;
  const hasSubRows = row.subRows.length > 0;

  const contextValues = useMemo(() => {
    return {
      disabled,
      isExpanded,
      isExpandable,
      depth,
      toggleExpanded: () => row.toggleExpanded(),
    };
  }, [depth, disabled, isExpandable, isExpanded, row]);

  return (
    <RowContextProvider {...contextValues}>
      <InternalRowBase
        className={getRowWithRTStyles({
          className,
          isDisabled: disabled,
          isExpanded: (isExpanded && hasSubRows) || isParentExpanded,
          isOddVSRow,
          isSelected,
          isVirtualRow: !!virtualRow,
          shouldAlternateRowColor,
          theme,
        })}
        data-selected={isSelected}
        data-expanded={isExpanded}
        data-depth={row.depth}
        id={`lg-table-row-${row.id}`}
        ref={useMergeRefs([rowRef, measureElement])}
        data-index={virtualRow ? virtualRow!.index : ''}
        {...rest}
      >
        {children}
      </InternalRowBase>
    </RowContextProvider>
  );
};

export const MemoizedInternalRowWithRT = React.memo(
  InternalRowWithRT,
  (prevProps, nextProps) => {
    // Early exit if rows should not be memoized
    if (!nextProps.shouldMemoizeRows) return false;

    // Extract children and compare counts
    const prevChildrenCount = React.Children.count(prevProps.children);
    const nextChildrenCount = React.Children.count(nextProps.children);

    if (prevChildrenCount !== nextChildrenCount) return false;

    // Compare all props except children and shouldMemoizeRows
    const { children: _1, shouldMemoizeRows: _2, ...prevRest } = prevProps;
    const { children: _3, shouldMemoizeRows: _4, ...nextRest } = nextProps;

    return isEqual(prevRest, nextRest);
  },
) as RowComponentWithRTType;
