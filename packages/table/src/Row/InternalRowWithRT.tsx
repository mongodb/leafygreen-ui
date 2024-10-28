import React, { ForwardedRef, useMemo } from 'react';
import isEqual from 'react-fast-compare';

import { cx } from '@leafygreen-ui/emotion';
import { useMergeRefs } from '@leafygreen-ui/hooks';

import { LGRowData } from '../useLeafyGreenTable';

import InternalRowBase from './InternalRowBase';
import {
  expandedContentParentStyles,
  grayZebraRowStyles,
  selectedRowStyles,
  zebraStyles,
} from './Row.styles';
import { InternalRowWithRTProps, RowComponentType } from './Row.types';
import { RowContextProvider } from './RowContext';

/**
 * Renders row data provided by `useReactTable`
 */
const InternalRowWithRTForwardRef = <T extends LGRowData>(
  {
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
  }: InternalRowWithRTProps<T>,
  ref: ForwardedRef<HTMLTableRowElement>,
) => {
  const isOddVSRow = !!virtualRow && virtualRow.index % 2 !== 0;

  //TODO: move this to Row
  const contextValues = useMemo(() => {
    return {
      disabled,
    };
  }, [disabled]);

  // eslint-disable-next-line no-console
  // console.log(`🪼rerender🪼 row: ${row.id}, depth: ${row.depth}`);

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
      data-depth={row.depth}
      id={`lg-table-row-${row.id}`}
      ref={useMergeRefs([ref, measureElement])}
      data-index={virtualRow ? virtualRow!.index : ''}
      {...rest}
    >
      <RowContextProvider {...contextValues}>{children}</RowContextProvider>
    </InternalRowBase>
  );
};

export const InternalRowWithRT = React.forwardRef(
  InternalRowWithRTForwardRef,
) as RowComponentType;

export default InternalRowWithRT;

// TODO: where can i move this?
const genericMemo: <
  T extends keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>,
>(
  component: T,
  propsAreEqual?: (
    prevProps: React.ComponentPropsWithRef<T>,
    nextProps: React.ComponentPropsWithRef<T>,
  ) => boolean,
) => T & { displayName?: string } = React.memo;

export const MemoizedInternalRowWithRT = genericMemo(
  InternalRowWithRT,
  (prevProps, nextProps) => {
    const { children: prevChildren, ...restPrevProps } = prevProps;
    const { children: nextChildren, ...restnextProps } = nextProps;

    const propsAreEqual = isEqual(restPrevProps, restnextProps);

    return propsAreEqual;
  },
);

// TODO: how can i type this so that i can pass it as the second argument to MemoizedInternalRowWithRT
// const arePropsEqual = (prevProps, nextProps) => {
//   // Children will never be the same
//   const { children: prevChildren, ...restPrevProps } = prevProps;
//   const { children: nextChildren, ...restnextProps } = nextProps;

//   const propsAreEqual = isEqual(restPrevProps, restnextProps);

//   return propsAreEqual;
// };
