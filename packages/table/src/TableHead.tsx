import React from 'react';
import HeaderRow from './HeaderRow';
import TableHeader from './TableHeader';
import { TableProps } from './Table';
import { isComponentType } from '@leafygreen-ui/lib';
import { Types, useTableContext } from './table-context';

type TableHeaderProps = Pick<TableProps, 'data' | 'columns'>;

const TableHead = ({ columns = [], data }: TableHeaderProps) => {
  const {
    state: { sort },
    dispatch,
  } = useTableContext();
  const usingHeaderRow = React.useRef(false);

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

  function createCols(array: Array<React.ReactNode>): React.ReactNode {
    return array.map((child, index) => {
      if (isComponentType(child, 'HeaderRow')) {
        usingHeaderRow.current = true;

        const { children } = child?.props;

        return React.cloneElement(child, {
          children: createCols(React.Children.toArray(children)),
        });
      }

      if (isComponentType(child, 'TableHeader')) {
        const { label, accessor: accessorProp } = child.props;

        let glyph = 'Unsorted';

        const accessor = accessorProp || label?.toLowerCase();

        if (sort && sort.key?.toLowerCase() === accessor) {
          glyph = sort.direction === 'asc' ? 'SortAscending' : 'SortDescending';
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
  }

  if (usingHeaderRow.current) {
    return <thead>{createCols(columns)}</thead>;
  }

  return (
    <thead>
      <HeaderRow>{createCols(columns)}</HeaderRow>
    </thead>
  );
};

export default TableHead;
