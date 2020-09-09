import React, { useMemo, useCallback } from 'react';
import { getDataComparisonFunction, useTableContext } from './TableContext';
import { TableProps } from './Table';

type TableBodyProps<Shape> = Pick<TableProps<Shape>, 'children'>;

/**
 * Hook that avoids re-rendering children when the data used to
 * render them hasn't changed, even if their ordering has changed.
 */
function useRenderedChildren<Props>(
  propList: Array<Props>,
  renderFunction: React.FunctionComponent<Props>,
  compareFn?: (a: Props, b: Props) => number,
): Array<React.ReactNode> {
  const resultMap = useMemo(() => {
    const resultMap = new Map<Props, React.ReactNode>();
    propList.forEach((props, index) =>
      resultMap.set(
        props,
        <React.Fragment key={index}>{renderFunction(props)}</React.Fragment>,
      ),
    );
    return resultMap;
  }, [propList, renderFunction]);

  return useMemo(() => {
    if (!compareFn) {
      return Array.from(resultMap.values());
    }

    return [...propList].sort(compareFn).map(props => resultMap.get(props));
  }, [propList, resultMap, compareFn]);
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
