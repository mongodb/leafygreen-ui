import React, { useReducer, ReactElement } from 'react';
import { isComponentType } from '@leafygreen-ui/lib';
import { css } from '@leafygreen-ui/emotion';
import TableProvider from './Context';
import HeaderRow, { HeaderRowProps } from './HeaderRow';
import TableHeader, { TableHeaderProps } from './TableHeader';
import CheckboxCell from './CheckboxCell';
import { State, coerceArray } from './utils';
import { reducer } from './useReducer';

// * Make sure dates are right aligned
// * Indent on Expanded Row

// * fix border bottom when rows are nested

// * style rowspan

// * Set up proper typings for useReducer
// * Keep track of checkmark states
// * Make sure if you set on second header row, the first header row is not impacted

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
    sort: { columnId: undefined, direction: 'asc', key: undefined },
    data,
    stickyColumns: [],
    selectable: selectableProp,
    mainCheckState: false,
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  let usingHeaderRow = React.useMemo(() => false, [children]);
  let rows: Array<React.ReactElement>;

  if (typeof children === 'function') {
    const unsortedRows = data.map((datum, index) => {
      return children({ datum, index });
    });

    rows = unsortedRows;
  } else {
    rows = coerceArray(children);
  }

  const sortRows = (columnId: number, key: string) => {
    dispatch({
      type: 'SORT',
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
        const renderedChildren = coerceArray(children);

        return React.cloneElement(child, {
          children: renderHeader(renderedChildren),
        });
      }

      if (isComponentType(child, 'TableHeader')) {
        const { label, accessor: accessorProp } = child.props;

        let glyph = 'Unsorted';

        const accessor = accessorProp || label?.toLowerCase();

        if (state?.sort?.key?.toLowerCase() === accessor) {
          glyph =
            state?.sort?.direction == 'asc'
              ? 'SortAscending'
              : 'SortDescending';
        }

        return React.cloneElement(child, {
          key: label,
          onClick: sortRows,
          index,
          glyph,
        });
      }

      if (typeof child === 'string') {
        return (
          <TableHeader
            label={child}
            key={child}
            index={index}
            onClick={sortRows}
          />
        );
      }

      return child;
    });

    return usingHeaderRow ? (
      cols
    ) : (
      <HeaderRow selectable={state.selectable}>{cols}</HeaderRow>
    );
  };

  const renderBody = () => {
    if (!children) {
      return null;
    }

    if (state.selectable) {
      return rows.map(row => {
        const selectCell = <CheckboxCell checked={state.mainCheckState} />;

        return React.cloneElement(row, {
          children: [selectCell, [...coerceArray(row.props.children)]],
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
