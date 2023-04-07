import React from 'react';
import { flexRender } from '@tanstack/react-table';
import { getAllByRole } from '@testing-library/dom';
import { fireEvent, render } from '@testing-library/react';

import { Cell } from '../Cell';
import { Row } from '../Row';
import TableBody from '../TableBody';
import { LeafyGreenTableRow } from '../useLeafyGreenTable';
import { Person } from '../utils/makeData.testutils';
import { useTestHookCall } from '../utils/testHookCalls.testutils';
import { Table } from '..';

import ExpandedContent from './ExpandedContent';

const RowWithExpandableContent = () => {
  const { containerRef, table } = useTestHookCall({
    rowProps: {
      // eslint-disable-next-line react/display-name
      renderExpandedContent: (_: LeafyGreenTableRow<Person>) => {
        return <>Expandable content test</>;
      },
    },
  });

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
          {table.getRowModel().rows.map((row: LeafyGreenTableRow<Person>) => {
            return (
              <Row key={row.id} row={row}>
                {row.getVisibleCells().map(cell => {
                  return (
                    <Cell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </Cell>
                  );
                })}
                {row.original.renderExpandedContent && (
                  <ExpandedContent row={row} />
                )}
              </Row>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

describe('packages/table/Row/ExpandableContent', () => {
  test('renders the correct number of cell children', () => {
    const { getAllByRole: getAllByRoleLocal } = render(
      <RowWithExpandableContent />,
    );
    const firstRow = getAllByRoleLocal('row')[1];
    expect(getAllByRole(firstRow, 'cell').length).toBe(6);
  });
  test('rows with expandable content render expand icon button', async () => {
    const { getByLabelText } = render(<RowWithExpandableContent />);
    const expandIconButton = getByLabelText('Expand row');
    expect(expandIconButton).toBeInTheDocument();
  });
  test('rows with expandable content render rows as tbody elements', async () => {
    const { getAllByRole } = render(<RowWithExpandableContent />);
    expect(getAllByRole('rowgroup').length).toBe(4); // 1 for thead, 3 for tbody
  });
  // eslint-disable-next-line jest/no-disabled-tests
  test.skip('clicking expand icon button renders collapse button and expanded content', async () => {
    const { getByLabelText, queryByText } = render(
      <RowWithExpandableContent />,
    );
    const expandIconButton = getByLabelText('Expand row');
    expect(queryByText('Expandable content test')).not.toBeInTheDocument();
    fireEvent.click(expandIconButton);
    const collapseIconButton = getByLabelText('collapse row');
    expect(collapseIconButton).toBeInTheDocument();
    expect(queryByText('Expandable content test')).toBeInTheDocument();
  });
});
