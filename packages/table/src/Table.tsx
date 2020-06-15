import React, { useReducer, ReactElement } from 'react';
import { cx, css } from '@leafygreen-ui/emotion';
import { HeaderRowProps } from './HeaderRow';
import { TableHeaderProps } from './TableHeader';
import { State, Types, TableProvider, reducer } from './table-context';
import TableHead from './TableHead';

// * fix row appearing as children of row -- not seeing this!

const tableStyles = css`
  border-collapse: collapse;
  box-sizing: border-box;
`;

type DataShape<Shape> = Shape extends infer U ? U : Shape;

interface TableRowInterface<Shape> {
  datum: DataShape<Shape>;
  index?: number;
}

export interface TableProps<Shape>
  extends React.ComponentPropsWithoutRef<'table'> {
  data: Array<DataShape<Shape>>;
  columns:
    | Array<ReactElement<HeaderRowProps>>
    | Array<ReactElement<TableHeaderProps> | string>
    | React.ReactFragment;
  selectable?: boolean;
  children: (TableRowArgs: TableRowInterface<Shape>) => JSX.Element;
}

// type TableProps<Shape> = Shape extends infer U
//   ? U
//   : Shape &
//       React.ComponentPropsWithoutRef<'table'> & {
//         data: Array<Shape>;
//         columns:
//           | Array<ReactElement<HeaderRowProps>>
//           | Array<ReactElement<TableHeaderProps> | string>
//           | React.ReactFragment;
//         selectable?: boolean;
//         children: (TableRowArgs: TableRowInterface<Shape>) => JSX.Element;
//       };

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

  React.useEffect(() => {
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

  const rows:
    | Array<React.ReactElement>
    | undefined = state.data?.map((datum, index) => children({ datum, index }));

  const renderBody = () => {
    if (!children) {
      return null;
    }

    return rows;
  };

  return (
    <TableProvider state={state} dispatch={dispatch}>
      <table
        cellSpacing="0"
        cellPadding="0"
        className={cx(tableStyles, className)}
        {...rest}
      >
        <TableHead data={data} columns={columns} />
        <tbody>{renderBody()}</tbody>
      </table>
    </TableProvider>
  );
}
