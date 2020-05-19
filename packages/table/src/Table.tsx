import React, { useReducer, ReactElement } from 'react';
import { isComponentType } from '@leafygreen-ui/lib';
import { css } from '@leafygreen-ui/emotion';
import HeaderRow, { HeaderRowProps } from './HeaderRow';
import TableHeader, { TableHeaderProps } from './TableHeader';
import CheckboxCell from './CheckboxCell';
import { State, Types, TableProvider, reducer } from './table-context';

// * Fix alt row coloring

// * style rowspan  -- maybe don't allow sort if you have rowspan
//   * fix hover
//   * not clickable

// * Clean TS

// * Make sure if you set on second header row, the first header row is not impacted
//   * Get rid of prop on header row
//   * If table is selectable, check header row for colspan, add select if no colspan

const tableStyles = css`
  border-collapse: collapse;
  box-sizing: border-box;
`;

interface TableProps extends React.ComponentPropsWithoutRef<'table'> {
  data?: Array<any>;
  columns?:
    | Array<ReactElement<HeaderRowProps>>
    | Array<ReactElement<TableHeaderProps> | string>;
  selectable?: boolean;
}

export default function Table({
  columns = [],
  data = [],
  selectable: selectableProp = false,
  children,
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

  // Make rowCheckedState into an Array
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

  let usingHeaderRow = React.useMemo(() => false, [children]);
  let rows: Array<React.ReactElement>;

  if (typeof children === 'function') {
    rows = data.map((datum, index) => children({ datum, index }));
  }

  const sortRows = (columnId: number, key: string) => {
    dispatch({
      type: Types.SortTableData,
      payload: {
        columnId,
        key,
        data,
      },
    });
  };

  const renderHeader = (array: Array<any>): React.ReactNode => {
    const cols = array.map((child, index) => {
      if (isComponentType(child, 'HeaderRow')) {
        usingHeaderRow = true;

        const { children } = child?.props;

        const renderedChildren = Array.isArray(children)
          ? children
          : [children];

        return React.cloneElement(child, {
          children: renderHeader(renderedChildren),
        });
      }

      if (isComponentType(child, 'TableHeader')) {
        const { label, accessor: accessorProp } = child.props;

        let glyph = 'Unsorted';

        const accessor = accessorProp || label?.toLowerCase();

        if (state.sort?.key?.toLowerCase() === accessor) {
          glyph =
            state.sort?.direction === 'asc'
              ? 'SortAscending'
              : 'SortDescending';
        }

        return React.cloneElement(child, {
          // safe until columns need to be reordered
          key: index,
          onClick: sortRows,
          index,
          glyph,
        });
      }

      if (typeof child === 'string') {
        return (
          <TableHeader
            // safe until columns need to be reordered
            key={index}
            label={child}
            index={index}
            onClick={sortRows}
          />
        );
      }

      return child;
    });

    return usingHeaderRow ? cols : <HeaderRow>{cols}</HeaderRow>;
  };

  const renderBody = () => {
    if (!children) {
      return null;
    }

    if (state.selectable) {
      return rows.map((row, index) => {
        const selectCell = <CheckboxCell index={index} />;

        return React.cloneElement(row, {
          children: [selectCell, [...Array.from(row.props.children)]],
        });
      });
    }

    return rows;
  };

  return (
    <TableProvider state={state} dispatch={dispatch}>
      <table cellSpacing="0" cellPadding="0" className={tableStyles}>
        <thead>{renderHeader(columns)}</thead>
        <tbody>{renderBody()}</tbody>
      </table>
    </TableProvider>
  );
}
