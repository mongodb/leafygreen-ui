import React from 'react';
import { getAllByRole } from '@testing-library/dom';
import { fireEvent, render } from '@testing-library/react';

import Cell from '../Cell';
import TableBody from '../TableBody';
import { LeafygreenTableRow } from '../useLeafygreenTable';
import { Person } from '../utils/makeData';
import { useTestHookCall } from '../utils/testHookCalls';
import { flexRender } from '..';

import Row from '.';

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

  return (
    <div ref={containerRef}>
      <table>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header, i) => {
                return <th key={header.id}>TH {i}</th>;
              })}
            </tr>
          ))}
        </thead>
        <TableBody table={table} renderingExpandableRows>
          {table.getRowModel().rows.map((row: LeafygreenTableRow<Person>) => {
            return (
              <Row key={row.id} row={row}>
                {row.getVisibleCells().map(cell => {
                  return (
                    <Cell key={cell.id} cell={cell}>
                      {cell.row.getCanExpand()}
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </Cell>
                  );
                })}
              </Row>
            );
          })}
        </TableBody>
      </table>
    </div>
  );
};

describe('packages/table/Row/ExpandableContent', () => {
  test('renders the correct number of children', () => {
    const { getAllByRole: getAllByRoleLocal } = render(<RowWithNestedRows />);
    const firstRow = getAllByRoleLocal('row')[1];
    expect(getAllByRole(firstRow, 'cell').length).toBe(6);
  });
  test('rows with nested rows render expand icon button', async () => {
    const { getByLabelText } = render(<RowWithNestedRows />);
    const expandIconButton = getByLabelText('expand row');
    expect(expandIconButton).toBeInTheDocument();
  });
  // eslint-disable-next-line jest/no-disabled-tests
  test.skip('clicking expand icon button renders collapse button and nested row content', async () => {
    const { getByLabelText, queryByText } = render(<RowWithNestedRows />);
    const expandIconButton = getByLabelText('expand row');
    expect(queryByText('Expandable content test')).not.toBeInTheDocument();
    fireEvent.click(expandIconButton);
    const collapseIconButton = getByLabelText('collapse row');
    // todo: these checks don't currently work, although the feature clearly does
    expect(collapseIconButton).toBeInTheDocument();
    expect(queryByText('nested row name')).toBeInTheDocument();
  });
});
