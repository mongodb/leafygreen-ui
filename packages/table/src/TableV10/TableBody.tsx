import React, { useCallback, useMemo } from 'react';

import { getDataComparisonFunction, useSortContext } from './SortContext';
import { TableProps, TableRowInterface } from './Table';
import { useTableContext } from './TableContext';

/**
 * @deprecated
 */
type TableBodyProps<Shape> = Pick<TableProps<Shape>, 'children'>;

/**
 * Hook that avoids re-rendering children when the data used to
 * render them hasn't changed, even if their ordering has changed.
 */
function useRenderedChildren<Datum>(
  data: Array<Datum>,
  renderFunction: React.FunctionComponent<TableRowInterface<Datum>>,
  compareFn?: (a: Datum, b: Datum) => number,
): Array<React.ReactNode> {
  const resultMap = useMemo(() => {
    const resultMap = new Map<Datum, React.ReactNode>();
    data.forEach((datum, index) =>
      resultMap.set(
        datum,
        <React.Fragment key={index}>
          {renderFunction({ datum, index })}
        </React.Fragment>,
      ),
    );
    return resultMap;
  }, [data, renderFunction]);

  return useMemo(() => {
    if (!compareFn) {
      return Array.from(resultMap.values());
    }

    return [...data].sort(compareFn).map(datum => resultMap.get(datum));
  }, [data, resultMap, compareFn]);
}

/**
 * @deprecated
 */
function TableBody<Shape>({ children }: TableBodyProps<Shape>) {
  const {
    state: { data },
  } = useTableContext();

  const { sort } = useSortContext();

  const compareFn = useMemo(() => {
    if (sort) {
      const { direction, accessorValue, compareFn } = sort;

      if (compareFn) {
        return getDataComparisonFunction({ direction, compareFn });
      }

      if (accessorValue) {
        return getDataComparisonFunction({ direction, accessorValue });
      }
    }
  }, [sort]);

  const renderFunction = useCallback(
    ({ datum, index }: TableRowInterface<Shape>) => children({ datum, index }),
    [children],
  );

  const rows = useRenderedChildren(data, renderFunction, compareFn);

  return <tbody>{rows}</tbody>;
}

TableBody.displayName = 'TableBody';

export default TableBody;
