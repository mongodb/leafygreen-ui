import React from 'react';
import { cx, css } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import { HeaderRowProps } from './HeaderRow';
import { TableHeaderProps } from './TableHeader';
import { TableProvider } from './TableContext';
import TableHead from './TableHead';
import TableBody from './TableBody';

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
    | Array<React.ReactElement<HeaderRowProps | TableHeaderProps<Shape>>>
    | React.ReactFragment;

  children: (TableRowArgs: TableRowInterface<Shape>) => JSX.Element;
}

export default function Table<Shape>({
  columns = [],
  data: dataProp = [],
  children,
  className,
  ...rest
}: TableProps<Shape>) {
  return (
    <TableProvider data={dataProp}>
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
