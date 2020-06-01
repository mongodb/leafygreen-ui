import React, { useReducer, ReactElement } from 'react';
import { cx, css } from '@leafygreen-ui/emotion';
import { HeaderRowProps } from './HeaderRow';
import { TableHeaderProps } from './TableHeader';
import CheckboxCell from './CheckboxCell';
import { State, Types, TableProvider, reducer } from './table-context';
import TableHead from './TableHead';

// * Clean TS
// * Add nodeRef to Row

const tableStyles = css`
  border-collapse: collapse;
  box-sizing: border-box;
`;

interface TableRowInterface {
  datum: any;
  index?: number;
}
export interface TableProps extends React.ComponentPropsWithoutRef<'table'> {
  data: Array<any>;
  columns:
    | Array<ReactElement<HeaderRowProps>>
    | Array<ReactElement<TableHeaderProps> | string>
    | React.ReactFragment;
  selectable?: boolean;
  children: (TableRowArgs: TableRowInterface) => JSX.Element;
}

export default function Table({
  columns = [],
  data = [],
  selectable: selectableProp = false,
  children,
  className,
  ...rest
}: TableProps) {
  const initialState: State = {
    sort: {
      direction: 'asc',
    },
    data,
    selectable: selectableProp,
    headerCheckState: false,
    headerIndeterminate: false,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const rows: Array<React.ReactElement> = data.map((datum, index) =>
    children({ datum, index }),
  );

  React.useEffect(() => {
    const rowCheckedState: {
      [n in number]: undefined | boolean;
    } = {};

    rows.forEach((datum, index) => {
      if (datum.props.disabled) {
        return;
      }
      rowCheckedState[index] = undefined;
    });

    if (rowCheckedState) {
      dispatch({
        type: Types.SetRowCheckedState,
        payload: rowCheckedState,
      });
    }
  }, [data]);

  React.useEffect(() => {
    if (state.rowCheckedState) {
      const boolArray = Object.values(state.rowCheckedState);
      const checkSame = boolArray.every(val => val === boolArray[0]);

      if (checkSame) {
        dispatch({
          type: Types.ToggleHeaderIndeterminate,
          payload: false,
        });

        if (boolArray[0]) {
          dispatch({
            type: Types.ToggleHeaderCheckedState,
            payload: true,
          });
        } else {
          dispatch({
            type: Types.ToggleHeaderCheckedState,
            payload: false,
          });
        }
      } else {
        dispatch({
          type: Types.ToggleHeaderIndeterminate,
          payload: true,
        });
      }
    }
  }, [state.data, state.rowCheckedState]);

  // if (typeof children === 'function') {
  // rows = data.map((datum, index) => children({ datum, index }));
  // }

  const renderBody = () => {
    if (!children) {
      return null;
    }

    if (state.selectable) {
      return rows.map((row, index) => {
        const selectCell = <CheckboxCell index={index} />;

        return React.cloneElement(row, {
          children: [
            selectCell,
            [...React.Children.toArray(row.props.children)],
          ],
        });
      });
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
