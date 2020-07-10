import React from 'react';
import HeaderRow from './HeaderRow';
import TableHeader from './TableHeader';
import { TableProps } from './Table';
import { isComponentType } from '@leafygreen-ui/lib';
import { Types, useTableContext } from './TableContext';

function normalizeAccessor(accessor: string | Function) {
  let accessorFn = accessor;

  if (typeof accessor === 'string') {
    if (accessor.includes('.')) {
      const accessorArr = accessor.split('.');

      accessorFn = data => {
        return accessorArr.reduce((obj, access) => {
          return obj[access];
        }, data);
      };
    } else {
      accessorFn = data => data[accessor];
    }
  }

  return accessorFn;
}

type TableHeaderProps = Pick<TableProps, 'data' | 'columns'>;

const TableHead = ({ columns = [], data }: TableHeaderProps) => {
  const { dispatch } = useTableContext();
  const usingHeaderRow = React.useRef(false);

  const sortRows = (columnId: number, accessorValue: () => string) => {
    dispatch({
      type: Types.SortTableData,
      payload: {
        columnId,
        accessorValue,
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
        const { label, accessor } = child.props;
        const normalizedAccessor = normalizeAccessor(
          accessor ?? label?.toLowerCase(),
        );

        return React.cloneElement(child, {
          // safe until columns need to be reordered
          key: index,
          onClick: sortRows,
          index,
          accessor: normalizedAccessor,
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

  const columnArray: Array<React.ReactElement> =
    // @ts-ignore Property 'type' does not exist on type '{}'.ts(2339)
    columns.type === React.Fragment
      ? React.Children.toArray((columns as React.ReactElement).props.children)
      : (columns as Array<any>);

  if (usingHeaderRow.current) {
    return <thead>{createCols(columnArray)}</thead>;
  }

  return (
    <thead>
      <HeaderRow>{createCols(columnArray)}</HeaderRow>
    </thead>
  );
};

export default TableHead;
