import React from 'react';
import { flexRender } from '@tanstack/react-table';
import { fireEvent, render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

import { Cell, HeaderCell } from '../Cell';
import { HeaderRow, Row } from '../Row';
import TableBody from '../TableBody';
import TableHead from '../TableHead';
import { LeafyGreenTableCell, LeafyGreenTableRow } from '../useLeafyGreenTable';
import { Person } from '../utils/makeData.testutils';
import {
  getDefaultTestData,
  TestTableWithHookProps,
  useTestHookCall,
} from '../utils/testHookCalls.testutils';

import Table from '.';

function TableWithHook(props: TestTableWithHookProps) {
  const { containerRef, table, rowSelection } = useTestHookCall(props);
  const { rows } = table.getRowModel();
  return (
    <>
      <div data-testid="row-selection-value">
        {JSON.stringify(rowSelection)}
      </div>
      <Table table={table} ref={containerRef}>
        <TableHead>
          {table.getHeaderGroups().map(headerGroup => (
            <HeaderRow key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                return (
                  <HeaderCell key={header.id} header={header}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </HeaderCell>
                );
              })}
            </HeaderRow>
          ))}
        </TableHead>
        <TableBody>
          {rows.map((row: LeafyGreenTableRow<Person>) => {
            return (
              <Row key={row.id} row={row}>
                {row
                  .getVisibleCells()
                  .map((cell: LeafyGreenTableCell<Person>) => {
                    return (
                      <Cell data-cellid={cell.id} key={cell.id}>
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
      </Table>
    </>
  );
}

describe('packages/table/Table', () => {
  describe('a11y', () => {
    test('does not have basic accessibility issues', async () => {
      const { container } = render(<Table />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('selectable rows', () => {
    test('renders checkboxes', async () => {
      const { getAllByRole } = render(
        <TableWithHook hookProps={{ hasSelectableRows: true }} />,
      );
      const data = getDefaultTestData({});
      // +1 for the header row checkbox
      expect(getAllByRole('checkbox').length).toBe(data.length + 1);
    });

    test('clicking checkbox adds row index to rowSelection state', async () => {
      const { getAllByRole, getByTestId } = render(
        <TableWithHook hookProps={{ hasSelectableRows: true }} />,
      );
      const firstCheckbox = getAllByRole('checkbox')[1];
      fireEvent.click(firstCheckbox);
      expect(getByTestId('row-selection-value').textContent).toBe('{"0":true}');
    });

    test('clicking selected checkbox removes row index from rowSelection state', async () => {
      const { getAllByRole, getByTestId } = render(
        <TableWithHook hookProps={{ hasSelectableRows: true }} />,
      );
      let firstCheckbox = getAllByRole('checkbox')[1];
      expect(getByTestId('row-selection-value').textContent).toBe('{}');
      fireEvent.click(firstCheckbox);
      expect(getByTestId('row-selection-value')).toHaveTextContent(
        '{"0":true}',
      );
      firstCheckbox = getAllByRole('checkbox')[1];
      fireEvent.click(firstCheckbox);
      expect(getByTestId('row-selection-value')).toHaveTextContent('{}');
    });

    test('clicking the header checkbox updates rowSelection state with all rows selected', async () => {
      const { getAllByRole, getByTestId } = render(
        <TableWithHook hookProps={{ hasSelectableRows: true }} />,
      );
      const headerCheckbox = getAllByRole('checkbox')[0];
      fireEvent.click(headerCheckbox);
      expect(getByTestId('row-selection-value').textContent).toBe(
        '{"0":true,"1":true,"2":true}',
      );
    });
  });

  describe('sortable rows', () => {
    test('renders sort icon', async () => {
      const { getByTestId, getByLabelText } = render(
        <TableWithHook columnProps={{ enableSorting: true }} />,
      );
      expect(getByTestId('lg-table-sort-icon-button')).toBeInTheDocument();
      expect(getByLabelText('Unsorted Icon')).toBeInTheDocument();
    });

    test('clicking sort icon toggles icon', async () => {
      const { getByTestId, getByLabelText } = render(
        <TableWithHook columnProps={{ enableSorting: true }} />,
      );
      const sortIconButton = getByTestId('lg-table-sort-icon-button');
      expect(sortIconButton).toBeInTheDocument();
      expect(getByLabelText('Unsorted Icon')).toBeInTheDocument();
      fireEvent.click(sortIconButton);
      expect(getByLabelText('Sort Descending Icon')).toBeInTheDocument();
    });

    test('clicking sort icon renders highest id at the top', async () => {
      const { getByTestId, getByLabelText } = render(
        <TableWithHook columnProps={{ enableSorting: true }} />,
      );
      const sortIconButton = getByTestId('lg-table-sort-icon-button');
      fireEvent.click(sortIconButton);
      expect(getByLabelText('Sort Descending Icon')).toBeInTheDocument();
      const tableCells = screen.getAllByRole('cell');
      const firstCell = tableCells[0];
      expect(firstCell).toHaveTextContent('3');
    });

    test('clicking sort icon twice renders lowest id at the top', async () => {
      const { getByTestId, getByLabelText } = render(
        <TableWithHook columnProps={{ enableSorting: true }} />,
      );
      const sortIconButton = getByTestId('lg-table-sort-icon-button');
      fireEvent.click(sortIconButton);
      fireEvent.click(sortIconButton);
      expect(getByLabelText('Sort Ascending Icon')).toBeInTheDocument();
      const tableCells = screen.getAllByRole('cell');
      const firstCell = tableCells[0];
      expect(firstCell).toHaveTextContent('1');
    });

    test('clicking sort icon thrice renders the initial id at the top', async () => {
      const { container, getByTestId, getByLabelText } = render(
        <TableWithHook columnProps={{ enableSorting: true }} />,
      );
      // @ts-ignore querySelector should not return null
      const initialFirstId = container.querySelector(
        '[data-cellid="0_id"] > div',
      ).innerHTML;
      const sortIconButton = getByTestId('lg-table-sort-icon-button');
      fireEvent.click(sortIconButton);
      fireEvent.click(sortIconButton);
      fireEvent.click(sortIconButton);
      expect(getByLabelText('Unsorted Icon')).toBeInTheDocument();
      const tableCells = screen.getAllByRole('cell');
      const firstCell = tableCells[0];
      expect(firstCell).toHaveTextContent(initialFirstId);
    });
  });
});
