import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

import Cell from '../Cell';
import HeaderCell from '../HeaderCell';
import HeaderRow from '../HeaderRow';
import Row from '../Row';
import TableBody from '../TableBody';
import TableContainer from '../TableContainer';
import TableHead from '../TableHead';
import { LeafyGreenTableCell, LeafyGreenTableRow } from '../useLeafyGreenTable';
import { Person } from '../utils/makeData';
import {
  getDefaultTestData,
  TestTableWithHookProps,
  useTestHookCall,
} from '../utils/testHookCalls';
import { flexRender } from '..';

import Table from '.';

function TableWithHook(props: TestTableWithHookProps) {
  const { containerRef, table, rowSelection } = useTestHookCall(props);
  const { rows } = table.getRowModel();
  return (
    <TableContainer ref={containerRef}>
      <div data-testid="row-selection-value">
        {JSON.stringify(rowSelection)}
      </div>
      <Table table={table}>
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
                      <Cell key={cell.id} cell={cell}>
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
    </TableContainer>
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
      const { getAllByLabelText } = render(
        <TableWithHook hookProps={{ hasSelectableRows: true }} />,
      );
      const data = getDefaultTestData({});
      // +1 for the header row checkbox
      expect(getAllByLabelText('checkbox').length).toBe(data.length + 1);
    });

    test('clicking checkbox adds row index to rowSelection state', async () => {
      const { getAllByLabelText, getByTestId } = render(
        <TableWithHook hookProps={{ hasSelectableRows: true }} />,
      );
      const firstCheckbox = getAllByLabelText('checkbox')[1];
      fireEvent.click(firstCheckbox);
      expect(getByTestId('row-selection-value').textContent).toBe('{"0":true}');
    });

    test('clicking selected checkbox removes row index from rowSelection state', async () => {
      const { getAllByLabelText, getByTestId } = render(
        <TableWithHook hookProps={{ hasSelectableRows: true }} />,
      );
      let firstCheckbox = getAllByLabelText('checkbox')[1];
      expect(getByTestId('row-selection-value').textContent).toBe('{}');
      fireEvent.click(firstCheckbox);
      expect(getByTestId('row-selection-value')).toHaveTextContent(
        '{"0":true}',
      );
      firstCheckbox = getAllByLabelText('checkbox')[1];
      fireEvent.click(firstCheckbox);
      expect(getByTestId('row-selection-value')).toHaveTextContent('{}');
    });

    test('clicking the header checkbox updates rowSelection state with all rows selected', async () => {
      const { getAllByLabelText, getByTestId } = render(
        <TableWithHook hookProps={{ hasSelectableRows: true }} />,
      );
      const headerCheckbox = getAllByLabelText('checkbox')[0];
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
      const firstCell = tableCells[0]; // skipping header row
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
      const firstCell = tableCells[0]; // skipping header row
      expect(firstCell).toHaveTextContent('1');
    });
  });
});
