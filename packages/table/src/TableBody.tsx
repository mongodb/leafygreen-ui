import React from 'react';
import { useTableContext } from './TableContext';
import { TableProps } from './Table';

type TableBodyProps<Shape> = Pick<TableProps<Shape>, 'children'>;

function TableBody<Shape>({ children }: TableBodyProps<Shape>) {
  const {
    state: { data },
  } = useTableContext();

  return (
    <tbody>{data.map((datum, index) => children({ datum, index }))}</tbody>
  );
}

export default TableBody;
