import React from 'react';
import { cx, css } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import { HeaderRowProps } from './HeaderRow';
import { TableHeaderProps } from './TableHeader';
import { TableProvider, useTableContext } from './TableContext';
import TableHead from './TableHead';

// Add tests for nested data structures to prove that sortBy prop works as expected

const tableStyles = css`
  border-collapse: collapse;
  box-sizing: border-box;
  border-bottom: 1px solid ${uiColors.gray.light2};
`;

interface TableRowInterface<Shape = {}> {
  datum: Shape;
  index?: number;
}

export interface TableProps<Shape>
  extends React.ComponentPropsWithoutRef<'table'> {
  data: Array<Shape>;
  columns:
    | Array<React.ReactElement<HeaderRowProps | TableHeaderProps> | string>
    | React.ReactFragment;
  selectable?: boolean;
  children: (TableRowArgs: TableRowInterface<Shape>) => JSX.Element;
}

type TableBodyProps<Shape> = Pick<TableProps<Shape>, 'children'>;

function TableBody<Shape>({ children }: TableBodyProps<Shape>) {
  const {
    state: { data },
  } = useTableContext();

  return (
    <tbody>{data.map((datum, index) => children({ datum, index }))}</tbody>
  );
}

export default function Table<Shape>({
  columns = [],
  data: dataProp = [],
  selectable: selectableProp = false,
  children,
  className,
  ...rest
}: TableProps<Shape>) {
  return (
    <TableProvider data={dataProp} selectable={selectableProp}>
      <table
        cellSpacing="0"
        cellPadding="0"
        className={cx(tableStyles, className)}
        {...rest}
      >
        <TableHead columns={columns} />
        <TableBody>{children}</TableBody>
      </table>
    </TableProvider>
  );
}
