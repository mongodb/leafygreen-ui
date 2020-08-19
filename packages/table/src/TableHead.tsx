import React from 'react';
import HeaderRow from './HeaderRow';
import { TableProps } from './Table';
import { isComponentType } from '@leafygreen-ui/lib';

type TableHeaderProps<Shape> = Pick<TableProps<Shape>, 'columns'>;

function TableHead<Shape>({ columns = [] }: TableHeaderProps<Shape>) {
  const usingHeaderRow = React.useRef(false);

  function createCols(array: Array<React.ReactNode>): React.ReactNode {
    return array.map((child, index) => {
      const tableHeaderCommonProps = {
        key: index,
        index,
      };

      if (isComponentType(child, 'HeaderRow')) {
        usingHeaderRow.current = true;

        const { children } = child?.props;

        return React.cloneElement(child, {
          children: createCols(React.Children.toArray(children)),
        });
      }

      if (isComponentType(child, 'TableHeader')) {
        return React.cloneElement(child, tableHeaderCommonProps);
      }

      return child;
    });
  }

  const cols = createCols(columns);

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
