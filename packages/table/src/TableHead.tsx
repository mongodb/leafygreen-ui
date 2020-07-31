import React from 'react';
import HeaderRow from './HeaderRow';
import TableHeader from './TableHeader';
import { TableProps } from './Table';
import { isComponentType } from '@leafygreen-ui/lib';
import { useTableContext } from './TableContext';

type TableHeaderProps<Shape> = Pick<TableProps<Shape>, 'columns'>;

function TableHead<Shape>({ columns = [] }: TableHeaderProps<Shape>) {
  const usingHeaderRow = React.useRef(false);

  // Breaks tables with a colSpan when we don't subscribe to state here, trying to figure out why
  const { state } = useTableContext();

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
        return React.cloneElement(child, {
          key: index,
          index,
        });
      }

      if (typeof child === 'string') {
        return <TableHeader key={index} label={child} index={index} />;
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
}

export default TableHead;
