import React, { useEffect } from 'react';
import { isComponentType } from '@leafygreen-ui/lib';
import { css } from '@leafygreen-ui/emotion';
import NumRowsProvider from './NumRowsContext';
import TableHeader, { TableHeaderProps } from './TableHeader';

// TODO:
// * Columns are sortable
//   * Change arrow on sort
//   * Make sure arrow reverts when new col is sorted
//   * Get proper icons
// * Rows are expandable
//   * Add Icon
//   * Add Functionality
// * Hover styles
// * Make sure dates are right aligned
// * Remove column

const tableStyles = css`
  border-collapse: collapse;
  box-sizing: border-box;
`;

interface TableProps extends React.ComponentPropsWithoutRef<'table'> {
  data?: Array<any>;
  columns?: Array<React.ComponentType<TableHeaderProps> | string>;
}

export default function Table({
  columns = [],
  data = [],
  children,
}: TableProps) {
  const [rows, setRows] = React.useState<Array<React.ReactElement>>([]);
  const [sort, setSort] = React.useState<
    'ascending' | 'descending' | undefined
  >();

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

  const getSortOrder = () => {
    if (sort === 'descending') {
      setSort('ascending');
    } else if (sort === 'ascending' || sort === undefined) {
      setSort('descending');
    }
  };

  const sortRows = (colId: number) => {
    getSortOrder();

    const sortedRows = rows.sort((a, b) => {
      const aVal = a.props.children[colId].props.children;
      const bVal = b.props.children[colId].props.children;

      if (sort === 'ascending' || sort === undefined) {
        return alphanumericCollator.compare(aVal, bVal);
      }

      return alphanumericCollator.compare(bVal, aVal);
    });

    setRows(sortedRows);
  };

  const renderColumns = () => {
    return columns.map((column, index) => {
      if (isComponentType(column, 'TableHeader')) {
        return React.cloneElement(column, {
          key: column?.props?.label,
          onClick: sortRows,
          index,
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
