import React, { useReducer, useEffect } from 'react';
import { cx, css } from '@leafygreen-ui/emotion';
import { HeaderRowProps } from './HeaderRow';
import { TableHeaderProps } from './TableHeader';
import { State, Types, TableProvider, reducer } from './TableContext';
import TableHead from './TableHead';

// * fix row appearing as children of row -- not seeing this!
// * Nested checkboxes:
//   * Checks children rows when parent becomes checked
//   * Something that updates the parent row when the children become unchecked

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
    headerCheckState: false,
    headerIndeterminate: false,
    hasNestedRows: false,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({
      type: Types.SelectableTable,
      payload: selectableProp,
    });
  }, [selectableProp]);

  useEffect(() => {
    if (state.rowCheckedState) {
      const boolArray = Object.values(state.rowCheckedState);
      const checkSame = boolArray.every(val => val === boolArray[0]);

      if (checkSame) {
        dispatch({
          type: Types.ToggleHeaderCheckedState,
          payload: boolArray[0] ? true : false,
        });
      } else {
        dispatch({
          type: Types.ToggleHeaderIndeterminate,
          payload: true,
        });
      }
    }
  }, [state.rowCheckedState]);

  console.log(state.data);

  const rows:
    | Array<React.ReactElement>
    | undefined = state.data.map((datum, index) => children({ datum, index }));

  return (
    <TableProvider state={state} dispatch={dispatch}>
      <table
        cellSpacing="0"
        cellPadding="0"
        className={cx(tableStyles, className)}
        {...rest}
      >
        <TableHead data={data} columns={columns} />
        <tbody>{!children ? null : rows}</tbody>
      </table>
    </TableProvider>
  );
}

// { id: { checked: true/false, children: [], }}
