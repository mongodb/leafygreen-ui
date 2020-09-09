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
  renderFunction: (props: Props) => React.ReactNode,
  compareFn?: (a: Props, b: Props) => number,
): Array<React.ReactNode> {
  const pairs: Array<[Props, React.ReactNode]> = useMemo(
    () =>
      propList.map((props, index) => [
        props,
        <React.Fragment key={index}>{renderFunction(props)}</React.Fragment>,
      ]),
    [propList, renderFunction],
  );

  return useMemo(() => {
    if (!compareFn) {
      return pairs.map(([_, renderResult]) => renderResult);
    }

    return pairs
      .sort(([a], [b]) => compareFn(a, b))
      .map(([_, renderResult]) => renderResult);
  }, [pairs, compareFn]);
}

function TableBody<Shape>({ children }: TableBodyProps<Shape>) {
  const {
    state: { data, sort },
  } = useTableContext();
  let compareFn: ((a: Shape, b: Shape) => number) | undefined;

  if (sort) {
    const { direction, accessorValue } = sort;

    if (direction && accessorValue) {
      compareFn = getDataComparisonFunction({ direction, accessorValue });
    }
  }

  const renderFunction = useCallback(datum => children({ datum }), [children]);

  const rows = useRenderedChildren(data, renderFunction, compareFn);

  return <tbody>{rows}</tbody>;
}

export default TableBody;
