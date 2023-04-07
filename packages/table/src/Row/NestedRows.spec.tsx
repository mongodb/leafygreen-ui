import React from 'react';
import { flexRender } from '@tanstack/react-table';
import { getAllByRole } from '@testing-library/dom';
import { fireEvent, render } from '@testing-library/react';

import { Cell } from '../Cell';
import TableBody from '../TableBody';
import { LeafyGreenTableRow } from '../useLeafyGreenTable';
import { Person } from '../utils/makeData.testutils';
import { useTestHookCall } from '../utils/testHookCalls.testutils';
import { Table } from '..';

import { Row } from '.';

const RowWithNestedRows = () => {
  const { containerRef, table } = useTestHookCall({
    rowProps: {
      subRows: [
        {
          id: 4,
          firstName: 'nested row name',
          lastName: 'test',
          age: 40,
          visits: 40,
          status: 'single',
        },
      ],
    },
  });

  const { rows } = table.getRowModel();

  return (
    <div ref={containerRef}>
      <Table table={table}>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header, i) => {
                return <th key={header.id}>TH {i}</th>;
              })}
            </tr>
          ))}
        </thead>
        <TableBody>
          {rows.map((row: LeafyGreenTableRow<Person>) => {
            return (
              <Row key={row.id} row={row}>
                {row.getVisibleCells().map(cell => {
                  return (
                    <Cell key={cell.id}>
                      {cell.row.getCanExpand()}
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </Cell>
                  );
                })}
                {row.subRows &&
                  row.subRows.map(subRow => (
                    <Row key={subRow.id} row={subRow}>
                      {subRow.getVisibleCells().map(cell => {
                        return (
                          <Cell key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext(),
                            )}
                          </Cell>
                        );
                      })}
                    </Row>
                  ))}
              </Row>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

describe('packages/table/Row/NestedRows', () => {
  test('renders the correct number of children', () => {
    const { getAllByRole: getAllByRoleLocal } = render(<RowWithNestedRows />);
    const firstRow = getAllByRoleLocal('row')[1];
    expect(getAllByRole(firstRow, 'cell').length).toBe(6);
  });
  test('rows with nested rows render expand icon button', async () => {
    const { getByLabelText } = render(<RowWithNestedRows />);
    const expandIconButton = getByLabelText('Expand row');
    expect(expandIconButton).toBeInTheDocument();
  });
  test('having a row with nested rows render all rows as tbody elements', async () => {
    const { getAllByRole } = render(<RowWithNestedRows />);
    expect(getAllByRole('rowgroup').length).toBe(4); // 1 for thead, 3 for tbody
  });
  // eslint-disable-next-line jest/no-disabled-tests
  test.skip('clicking expand icon button renders collapse button and nested row content', async () => {
    const { getByLabelText, queryByText } = render(<RowWithNestedRows />);
    const expandIconButton = getByLabelText('Expand row');
    // the line below is not reliable as the row is expanded - the height is just 0
    expect(queryByText('nested row name')).not.toBeVisible();
    fireEvent.click(expandIconButton);
    const collapseIconButton = getByLabelText('Collapse row');
    expect(collapseIconButton).toBeInTheDocument();
    // the line below is not reliable as the row is expanded - the height is just 0
    expect(queryByText('nested row name')).toBeVisible();
  });
});
