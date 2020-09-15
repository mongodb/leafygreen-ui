import React, { useMemo, useCallback } from 'react';
import { getDataComparisonFunction, useTableContext } from './TableContext';
import { TableProps } from './Table';

type TableBodyProps<Shape> = Pick<TableProps<Shape>, 'children'>;

/**
 * Hook that avoids re-rendering children when the data used to
 * render them hasn't changed, even if their ordering has changed.
 */
function useRenderedChildren<Datum>(
  data: Array<Datum>,
  renderFunction: React.FunctionComponent<Datum>,
  compareFn?: (a: Datum, b: Datum) => number,
): Array<React.ReactNode> {
  const resultMap = useMemo(() => {
    const resultMap = new Map<Datum, React.ReactNode>();
    data.forEach((datum, index) =>
      resultMap.set(
        datum,
        <React.Fragment key={index}>{renderFunction(datum)}</React.Fragment>,
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

function TableBody<Shape>({ children }: TableBodyProps<Shape>) {
  const {
    state: { data, sort },
  } = useTableContext();

  const compareFn = useMemo(() => {
    if (sort) {
      const { direction, accessorValue } = sort;

      if (direction && accessorValue) {
        return getDataComparisonFunction({ direction, accessorValue });
      }
    }
  }, [sort]);

  const renderFunction = useCallback(datum => children({ datum }), [children]);

  const rows = useRenderedChildren(data, renderFunction, compareFn);

  return <tbody>{rows}</tbody>;
}

export default TableBody;
