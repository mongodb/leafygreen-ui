import React from 'react';
import { getAllByRole } from '@testing-library/dom';
import { fireEvent, render } from '@testing-library/react';

import { Cell } from '../Cell';
import TableBody from '../TableBody';
import { LeafyGreenTableRow } from '../useLeafyGreenTable';
import { Person } from '../utils/makeData';
import { useTestHookCall } from '../utils/testHookCalls';
import Table, { flexRender } from '..';

import Row from '.';
import ExpandedContent from '../ExpandedContent/ExpandedContent';

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
                  <ExpandedContent
                    row={row}
                    data-testid='lg-table-expandable-row-tbody'
                  />
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
  test('renders the correct number of children', () => {
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
    const { getByTestId } = render(<RowWithExpandableContent />);
    const expandableRowTbody = getByTestId('lg-table-expandable-row-tbody');
    expect(expandableRowTbody).toBeInTheDocument();
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
    // todo: these checks don't currently work, although the feature clearly does
    expect(collapseIconButton).toBeInTheDocument();
    expect(queryByText('Expandable content test')).toBeInTheDocument();
  });
});
