import React from 'react';

import { isComponentType } from '@leafygreen-ui/lib';

import HeaderRow, { HeaderRowElement } from './HeaderRow';
import { TableProps } from './Table';
import { TableHeaderElement } from './TableHeader';

/**
 * @deprecated
 */
type TableHeaderProps<Shape> = Pick<TableProps<Shape>, 'columns'>;

/**
 * @deprecated
 */
function TableHead<Shape>({ columns = [] }: TableHeaderProps<Shape>) {
  const usingHeaderRow = React.useRef(false);

  function createCols(array: Array<React.ReactNode>): React.ReactNode {
    return array.map((child, index) => {
      const tableHeaderCommonProps = {
        key: index,
        index,
      };

      if (isComponentType<HeaderRowElement>(child, 'HeaderRow')) {
        usingHeaderRow.current = true;

        const { children } = child?.props;

        return React.cloneElement(child, {
          children: createCols(React.Children.toArray(children)),
        });
      }

      if (isComponentType<TableHeaderElement>(child, 'TableHeader')) {
        return React.cloneElement(child, tableHeaderCommonProps);
      }

      return child;
    });
  }

  const columnArray: Array<React.ReactElement> =
    // @ts-expect-error Property 'type' does not exist on type '{}'.ts(2339)
    columns.type === React.Fragment ||
    isComponentType<HeaderRowElement>(columns, 'HeaderRow')
      ? React.Children.toArray((columns as React.ReactElement).props.children)
      : (columns as Array<any>);

  const cols = createCols(columnArray);

  if (usingHeaderRow.current) {
    return <thead>{cols}</thead>;
  }

  return (
    <thead>
      <HeaderRow>{cols}</HeaderRow>
    </thead>
  );
}

export default TableHead;
