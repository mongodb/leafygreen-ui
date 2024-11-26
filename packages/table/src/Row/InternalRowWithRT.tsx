import React, { ForwardedRef, useMemo } from 'react';
import isEqual from 'react-fast-compare';

import { cx } from '@leafygreen-ui/emotion';
import { useMergeRefs } from '@leafygreen-ui/hooks';

import { LGRowData } from '../useLeafyGreenTable';

import InternalRowBase from './InternalRowBase';
import { getRowWithRTStyles } from './Row.styles';
import {
  forwardRefWithGenerics,
  InternalRowWithRTProps,
  memoWithGenerics,
} from './Row.types';
import { RowContextProvider } from './RowContext';

/**
 * Renders row data provided by `useReactTable`
 *
 * @internal
 */
export const InternalRowWithRTForwardRef = forwardRefWithGenerics(
  function InternalRowWithRTForwardRef<T extends LGRowData>(
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
  ) {
    // We need to use the virtualRow index instead of nth-of-type because the rows are not static
    const isOddVSRow = !!virtualRow && virtualRow.index % 2 !== 0;

    const isExpandable = row.getCanExpand();
    const depth = row.depth;

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
          className={cx(
            getRowWithRTStyles(
              isOddVSRow,
              shouldAlternateRowColor,
              isSelected,
              !!virtualRow,
              disabled,
              isExpanded || isParentExpanded,
              theme,
            ),
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
          {children}
        </InternalRowBase>
      </RowContextProvider>
    );
  },
);

const MemoizedInternalRowWithRT = memoWithGenerics(
  InternalRowWithRTForwardRef,
  (prevProps, nextProps) => {
    const { children: prevChildren, ...restPrevProps } = prevProps;
    const { children: nextChildren, ...restnextProps } = nextProps;

    const propsAreEqual = isEqual(restPrevProps, restnextProps);

    return propsAreEqual;
  },
);

// // React.forwardRef can only work with plain function types, i.e. types with a single call signature and no other members.
// // This assertion has an interface that restores the original function signature to work with generics.
// export const InternalRowWithRT = React.forwardRef(
//   InternalRowWithRTForwardRef,
// ) as RowComponentWithRTType;

// export default InternalRowWithRT;

// // const genericMemo: GenericMemo = React.memo;

// export const memoWithGenerics = React.memo as <P extends object>(
// 	Component: (props: P) => ReturnType<React.FunctionComponent>,
// 	propsAreEqual?: (
// 		prevProps: Readonly<P>,
// 		nextProps: Readonly<P>,
// 	) => boolean,
// ) => (props: P) => ReturnType<React.FunctionComponent>;

// export const MemoizedInternalRowWithRT = memoWithGenerics(
//   InternalRowWithRT,
//   (prevProps, nextProps) => {
//     const { children: prevChildren, ...restPrevProps } = prevProps;
//     const { children: nextChildren, ...restnextProps } = nextProps;

//     const propsAreEqual = isEqual(restPrevProps, restnextProps);

//     return propsAreEqual;
//   },
// );

// as React.MemoExoticComponent<
// <T extends LGRowData>(props: InternalRowWithRTProps<T> & { ref?: ForwardedRef<HTMLTableRowElement> }) => JSX.Element
// >;

// as <P extends object>(
// 	Component: (props: P) => ReturnType<React.FunctionComponent>,
// 	propsAreEqual?: (
// 		prevProps: Readonly<P>,
// 		nextProps: Readonly<P>,
// 	) => boolean,
// ) => (props: P) => ReturnType<React.FunctionComponent>

// Utility type to combine forwardRef and memo with generics
// type MemoForwardRefComponent<T, P> = React.MemoExoticComponent<
//   React.ForwardRefExoticComponent<P & React.RefAttributes<T>>
// >;

// // Wrap with forwardRef
// const ForwardedInternalRowWithRT = React.forwardRef(
//   InternalRowWithRTForwardRef
// ) as <T extends LGRowData>(
//   props: InternalRowWithRTProps<T> & { ref?: React.Ref<HTMLTableRowElement> }
// ) => ReturnType<typeof InternalRowWithRTForwardRef>;

// // Wrap with memo
// const MemoizedInternalRowWithRT: MemoForwardRefComponent<
//   HTMLTableRowElement,
//   InternalRowWithRTProps<any>
// > = React.memo(
//   ForwardedInternalRowWithRT,
//   (prevProps, nextProps) => isEqual(prevProps, nextProps)
// );

export default MemoizedInternalRowWithRT;
