// @ts-nocheck
import React, { useMemo } from 'react';
import isEqual from 'react-fast-compare';

import { cx } from '@leafygreen-ui/emotion';

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
  ...rest
}: InternalRowWithRTProps<T>) => {
  const isOddVSRow = !!virtualRow && virtualRow.index % 2 !== 0;

  const contextValues = useMemo(() => {
    return {
      disabled,
      isReactTable: true,
    };
  }, [disabled]);

  const depth = row.depth;

  console.log(`🪼rerender🪼 row: ${row.id}, depth: ${depth}`, {
    isExpanded: isExpanded,
  });

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
          // [css`
          //   /* display: none; */

          //   > td div {
          //     height: 0;
          //     overflow: hidden;
          //     min-height: 0;
          //   }
          // `]: row.depth !== 0 && isParentExpanded === false,
        },
        className,
      )}
      data-selected={isSelected}
      data-expanded={isExpanded}
      data-depth={row.depth}
      id={`lg-table-row-${row.id}`}
      ref={node => {
        if (measureElement) measureElement(node); // can this be added to table context?
      }}
      data-index={virtualRow ? virtualRow!.index : ''}
      {...rest}
    >
      <RowContextProvider {...contextValues}>{children}</RowContextProvider>
    </InternalRowBase>
  );
};

export default InternalRowWithRT;

const arePropsEqual = (prevProps, nextProps) => {
  // Children will never be the same
  const { children: prevChildren, ...restPrevProps } = prevProps;
  const { children: nextChildren, ...restnextProps } = nextProps;

  const propsAreEqual = isEqual(restPrevProps, restnextProps);

  // console.log('🧤', {
  //   children: prevProps.children === nextProps.children,
  //   propsWithoutChildren: isEqual(restPrevProps, restnextProps),
  // });

  return propsAreEqual;
};

export const MemoizedInternalRowWithRT = React.memo(
  InternalRowWithRT,
  arePropsEqual,
);
