import React, { useEffect, ReactElement } from 'react';
import { isComponentType } from '@leafygreen-ui/lib';
import { css } from '@leafygreen-ui/emotion';
import NumRowsProvider from './NumRowsContext';
import TableHeader, { TableHeaderProps } from './TableHeader';

// * Hover styles
// * Make sure dates are right aligned

const tableStyles = css`
  border-collapse: collapse;
  box-sizing: border-box;
`;

const SortOrder = {
  Asc: 'asc',
  Desc: 'desc',
};

type SortOrder = keyof typeof SortOrder;

interface SortOrderState {
  [key: number]: SortOrder;
}

interface TableProps extends React.ComponentPropsWithoutRef<'table'> {
  data?: Array<any>;
  columns?: Array<ReactElement<TableHeaderProps> | string>;
}

export default function Table({
  columns = [],
  data = [],
  children,
}: TableProps) {
  const [rows, setRows] = React.useState<Array<React.ReactElement>>([]);
  const [sort, setSort] = React.useState<SortOrderState>({});

  useEffect(() => {
    if (typeof children === 'function') {
      const unsortedRows = data.map((datum, index) => {
        return children({ datum, index });
      });

      setRows(unsortedRows);
    }
  }, [children]);

  const alphanumericCollator = new Intl.Collator(undefined, {
    numeric: true,
    sensitivity: 'base',
  });

  const sortRows = (colId?: number) => {
    if (typeof colId !== 'number') {
      return;
    }

    if (sort[colId] === SortOrder.Asc || sort[colId] === undefined) {
      // @ts-ignore
      setSort({ [colId]: SortOrder.Desc });
    } else {
      // @ts-ignore
      setSort({ [colId]: SortOrder.Asc });
    }

    const sortedRows = rows.sort((a, b) => {
      const aVal = a.props.children[colId].props.children;
      const bVal = b.props.children[colId].props.children;

      if (sort[colId] === SortOrder.Asc || sort[colId] === undefined) {
        return alphanumericCollator.compare(aVal, bVal);
      }

      return alphanumericCollator.compare(bVal, aVal);
    });

    setRows(sortedRows);
  };

  const renderColumns = () => {
    return columns.map((column, index) => {
      if (isComponentType(column, 'TableHeader')) {
        const glyph = sort[index]
          ? sort[index] === SortOrder.Asc
            ? 'SortAscending'
            : 'SortDescending'
          : 'Unsorted';
        return React.cloneElement(column, {
          key: column?.props?.label,
          onClick: sortRows,
          index,
          glyph,
        });
      }

      if (typeof column === 'string') {
        return (
          <TableHeader
            label={column}
            key={column}
            index={index}
            onClick={sortRows}
          />
        );
      }

      return column;
    });
  };

  const renderBody = () => {
    if (!children) {
      return null;
    }

    if (typeof children === 'function') {
      return rows;
    }

    return children;
  };

  return (
    <NumRowsProvider numRows={data.length}>
      <table cellSpacing="0" cellPadding="0" className={tableStyles}>
        <thead>
          <tr>{renderColumns()}</tr>
        </thead>
        <tbody>{renderBody()}</tbody>
      </table>
    </NumRowsProvider>
  );
}
