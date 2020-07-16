import React, { useReducer, useEffect } from 'react';
import { cx, css } from '@leafygreen-ui/emotion';
import { HeaderRowProps } from './HeaderRow';
import { TableHeaderProps } from './TableHeader';
import { State, Types, TableProvider, reducer } from './TableContext';
import TableHead from './TableHead';

// Check with Rob about desired behavior for selectable tables when intersecting with disabled
// Add tests for nested data structures to prove that sortBy prop works as expected

const tableStyles = css`
  border-collapse: collapse;
  box-sizing: border-box;
`;

type DataShape<Shape> = Shape extends infer U ? U : Shape;

interface TableRowInterface<Shape = {}> {
  datum: DataShape<Shape>;
  index?: number;
}

export interface TableProps<Shape>
  extends React.ComponentPropsWithoutRef<'table'> {
  data: Array<DataShape<Shape>>;
  columns:
    | Array<React.ReactElement<HeaderRowProps | TableHeaderProps> | string>
    | React.ReactFragment;
  selectable?: boolean;
  children: (TableRowArgs: TableRowInterface<Shape>) => JSX.Element;
}

export default function Table<Shape>({
  columns = [],
  data = [],
  selectable: selectableProp = false,
  children,
  className,
  ...rest
}: TableProps<Shape>) {
  const initialState: State = {
    sort: {
      direction: 'asc',
    },
    data,
    selectable: selectableProp,
    headerCheckState: {
      checked: false,
      indeterminate: false,
    },
    hasNestedRows: false,
    rowState: {},
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({
      type: Types.SelectableTable,
      payload: selectableProp,
    });
  }, [selectableProp]);

  return (
    <TableProvider state={state} dispatch={dispatch}>
      <table
        cellSpacing="0"
        cellPadding="0"
        className={cx(tableStyles, className)}
        {...rest}
      >
        <TableHead data={data} columns={columns} />
        <tbody>
          {state.data.map((datum, index) => children({ datum, index }))}
        </tbody>
      </table>
    </TableProvider>
  );
}
