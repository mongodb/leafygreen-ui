import { css } from '@leafygreen-ui/emotion';
import React, { forwardRef, PropsWithChildren } from 'react';
import TableContainerProps from './TableContainer.types';

const TableContainer = forwardRef<HTMLDivElement, TableContainerProps>(
  (
    {
      children,
      onScroll: onScrollProp,
    }: PropsWithChildren<TableContainerProps>,
    forwardedRef,
  ) => {
    // const [sorting, setSorting] = React.useState<SortingState>([])

    // // //we must flatten the array of arrays from the useInfiniteQuery hook
    // const flatData = React.useMemo(
    //   () => data?.pages?.flatMap(page => page.data) ?? [],
    //   [data]
    // )
    // const totalDBRowCount = data?.pages?.[0]?.meta?.totalRowCount ?? 0
    // const totalFetched = flatData.length

    // const fetchMoreOnBottomReached = React.useCallback( //called on scroll and possibly on mount to fetch more data as the user scrolls and reaches bottom of table
    //   (containerRefElement?: HTMLDivElement | null) => {
    //     if (containerRefElement) {
    //       const { scrollHeight, scrollTop, clientHeight } = containerRefElement
    //       //once the user has scrolled within 300px of the bottom of the table, fetch more data if there is any
    //       if (
    //         scrollHeight - scrollTop - clientHeight < 300 &&
    //         !isFetching &&
    //         totalFetched < totalDBRowCount
    //       ) {
    //         fetchNextPage()
    //       }
    //     }
    //   },
    //   [fetchNextPage, isFetching, totalFetched, totalDBRowCount]
    // )

    const handleScroll:
      | React.UIEventHandler<HTMLDivElement>
      | undefined = e => {
      // fetchMoreOnBottomReached(e.target as HTMLDivElement)
      onScrollProp && onScrollProp(e);
    };

    // if (isLoading) {
    //   return <>Loading...</>
    // }

    return (
      <div
        ref={forwardedRef}
        onScroll={handleScroll}
        className={css`
          overflow: auto;
          height: 500px;
          width: 100%;
        `}
      >
        {children}
      </div>
    );
  },
);

export default TableContainer;
