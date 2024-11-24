import React from 'react';
import { flexRender } from '@tanstack/react-table';
import { fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Cell } from '../Cell';
import TableBody from '../TableBody';
import { LeafyGreenTableRow } from '../useLeafyGreenTable';
import { getTestUtils } from '../utils/getTestUtils/getTestUtils';
import { Person } from '../utils/makeData.testutils';
import { useTestHookCall } from '../utils/testHookCalls.testutils';
import { Table } from '..';

import { Row } from '.';

const RowWithNestedRows = args => {
  const { table } = useTestHookCall({
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
        {rows.map((row: LeafyGreenTableRow<Person>) => {
          return (
            <Row row={row} key={row.id}>
              {row.getVisibleCells().map(cell => {
                return (
                  <Cell key={cell.id} cell={cell}>
                    {cell.row.getCanExpand()}
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Cell>
                );
              })}
            </Row>
          );
        })}
      </TableBody>
    </Table>
  );
};

describe('packages/table/Row/RowWithRT', () => {
  test('renders the correct number of children', () => {
    render(<RowWithNestedRows />);
    const { getRowByIndex } = getTestUtils();
    expect(getRowByIndex(0)?.getAllCells()).toHaveLength(6);
  });
  test('rows with nested rows render expand icon button', async () => {
    render(<RowWithNestedRows />);
    const { getRowByIndex } = getTestUtils();
    expect(getRowByIndex(0)?.getExpandButton()).toHaveAttribute(
      'aria-label',
      'Expand row',
    );
  });

  test('having a row with nested rows render all rows as tr elements', async () => {
    const { getAllByRole } = render(<RowWithNestedRows />);
    expect(getAllByRole('row').length).toBe(4); // 1 header row and 3 tbody rows
  });

  test('clicking expand icon button renders collapse button and nested row content', async () => {
    render(<RowWithNestedRows />);
    const { getAllVisibleRows, getRowByIndex } = getTestUtils();
    expect(getAllVisibleRows().length).toBe(3);

    const toggleRowButton = getRowByIndex(0)?.getExpandButton();
    expect(toggleRowButton).toHaveAttribute('aria-label', 'Expand row');

    userEvent.click(toggleRowButton!);
    expect(getAllVisibleRows().length).toBe(4);
    expect(toggleRowButton).toHaveAttribute('aria-label', 'Collapse row');
  });

  describe('accepts a ref', () => {
    test('RT cell', () => {
      const ref = React.createRef<HTMLTableRowElement>();
      const rowObj = {
        id: '1',
        getIsExpanded: () => false,
        getParentRow: () => ({
          getIsExpanded: () => false,
        }),
        getIsSelected: () => false,
        getCanExpand: () => true,
      };

      render(
        // @ts-expect-error - dummy row data is missing properties
        <Row row={rowObj} ref={ref}>
          Hello RT
        </Row>,
      );

      expect(ref.current).toBeInTheDocument();
      expect(ref.current!.textContent).toBe('Hello RT');
    });
  });
});
