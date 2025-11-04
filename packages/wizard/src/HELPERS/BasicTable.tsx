import React from 'react';

import {
  Cell,
  flexRender,
  HeaderCell,
  HeaderRow,
  LeafyGreenTable,
  LGRowData,
  Row,
  Table,
  TableBody,
  TableHead,
} from '@leafygreen-ui/table';

interface BasicTableProps<D extends LGRowData> {
  table: LeafyGreenTable<D>;
}

export const BasicTable = <D extends LGRowData>({
  table,
}: BasicTableProps<D>) => {
  return (
    <Table table={table}>
      <TableHead>
        {table.getHeaderGroups().map(headerGroup => (
          <HeaderRow key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <HeaderCell key={header.id} header={header}>
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext(),
                )}
              </HeaderCell>
            ))}
          </HeaderRow>
        ))}
      </TableHead>
      <TableBody>
        {table.getRowModel().rows.map(row => (
          <Row key={row.id} row={row}>
            {row.getVisibleCells().map(cell => (
              <Cell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </Cell>
            ))}
          </Row>
        ))}
      </TableBody>
    </Table>
  );
};
