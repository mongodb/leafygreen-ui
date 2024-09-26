import React from 'react';
import { flexRender } from '@tanstack/react-table';
import { fireEvent, render } from '@testing-library/react';

import { Cell } from '../Cell';
import { Row } from '../Row';
import TableBody from '../TableBody';
import { LeafyGreenTableRow } from '../useLeafyGreenTable';
import { getTestUtils } from '../utils/getTestUtils/getTestUtils';
import { Person } from '../utils/makeData.testutils';
import { useTestHookCall } from '../utils/testHookCalls.testutils';
import { Table } from '..';

import ExpandedContent from './ExpandedContent';

const RowWithExpandableContent = args => {
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
      <Table table={table} {...args}>
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
    render(<RowWithExpandableContent />);
    const { getRowByIndex } = getTestUtils();
    expect(getRowByIndex(0)?.getAllCells()).toHaveLength(6);
  });
  test('rows with expandable content render expand icon button', async () => {
    render(<RowWithExpandableContent />);
    const { getRowByIndex } = getTestUtils();
    expect(getRowByIndex(0)?.getExpandButton()).toHaveAttribute(
      'aria-label',
      'Expand row',
    );
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

  describe('disabled animations', () => {
    test('renders the correct number of cell children with disabled animations', () => {
      render(<RowWithExpandableContent disableAnimations />);
      const { getRowByIndex } = getTestUtils();
      expect(getRowByIndex(0)?.getAllCells()).toHaveLength(6);
    });
    test('rows with expandable content render expand icon button with disabled animations', async () => {
      render(<RowWithExpandableContent disableAnimations />);
      const { getRowByIndex } = getTestUtils();
      expect(getRowByIndex(0)?.getExpandButton()).toHaveAttribute(
        'aria-label',
        'Expand row',
      );
    });
    test('rows with expandable content render rows as tbody elements with disabled animations', async () => {
      const { getAllByRole } = render(
        <RowWithExpandableContent disableAnimations />,
      );
      expect(getAllByRole('rowgroup').length).toBe(4); // 1 for thead, 3 for tbody
    });
  });
});
