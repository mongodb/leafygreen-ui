import React from 'react';
import { flexRender } from '@tanstack/react-table';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { Cell, HeaderCell } from '../Cell';
import { HeaderRow, Row } from '../Row';
import TableBody from '../TableBody';
import TableHead from '../TableHead';
import { LeafyGreenTableCell, LeafyGreenTableRow } from '../useLeafyGreenTable';
import { getTestUtils } from '../utils/getTestUtils/getTestUtils';
import { Person } from '../utils/makeData.testutils';
import {
  getDefaultTestData,
  TestTableWithHookProps,
  useTestHookCall,
} from '../utils/testHookCalls.testutils';

import Table from '.';

function TableWithHook(props: TestTableWithHookProps) {
  const { table, rowSelection } = useTestHookCall(props);
  const { rows } = table.getRowModel();
  return (
    <>
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
                      <Cell data-cellid={cell.id} key={cell.id} cell={cell}>
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
      const { getByTestId } = render(
        <TableWithHook hookProps={{ hasSelectableRows: true }} />,
      );
      const { getRowByIndex } = getTestUtils();
      const firstCheckbox = getRowByIndex(0)?.getCheckbox();
      userEvent.click(firstCheckbox!, {}, { skipPointerEventsCheck: true });
      expect(getByTestId('row-selection-value').textContent).toBe('{"0":true}');
    });

    test('clicking selected checkbox removes row index from rowSelection state', async () => {
      const { getByTestId } = render(
        <TableWithHook hookProps={{ hasSelectableRows: true }} />,
      );
      const { getRowByIndex } = getTestUtils();
      let firstCheckbox = getRowByIndex(0)?.getCheckbox();
      expect(getByTestId('row-selection-value').textContent).toBe('{}');
      userEvent.click(firstCheckbox!, {}, { skipPointerEventsCheck: true });
      expect(getByTestId('row-selection-value')).toHaveTextContent(
        '{"0":true}',
      );
      firstCheckbox = getRowByIndex(0)?.getCheckbox();
      userEvent.click(firstCheckbox!, {}, { skipPointerEventsCheck: true });
      expect(getByTestId('row-selection-value')).toHaveTextContent('{}');
    });

    test('clicking the header checkbox updates rowSelection state with all rows selected', async () => {
      const { getByTestId } = render(
        <TableWithHook hookProps={{ hasSelectableRows: true }} />,
      );

      const { getSelectAllCheckbox } = getTestUtils();
      const headerCheckbox = getSelectAllCheckbox();
      userEvent.click(headerCheckbox!, {}, { skipPointerEventsCheck: true });

      expect(getByTestId('row-selection-value').textContent).toBe(
        '{"0":true,"1":true,"2":true}',
      );
    });
  });

  describe('sortable rows', () => {
    test('renders sort icon', async () => {
      render(<TableWithHook columnProps={{ enableSorting: true }} />);
      const { getHeaderByIndex } = getTestUtils();
      expect(getHeaderByIndex(0)?.getSortIcon()).toBeInTheDocument();
    });

    test('clicking sort icon toggles icon', async () => {
      const { getByLabelText } = render(
        <TableWithHook columnProps={{ enableSorting: true }} />,
      );

      const { getHeaderByIndex } = getTestUtils();
      const sortIconButton = getHeaderByIndex(0)?.getSortIcon();
      expect(sortIconButton).toBeInTheDocument();
      expect(getByLabelText('Unsorted Icon')).toBeInTheDocument();
      userEvent.click(sortIconButton!, {}, { skipPointerEventsCheck: true });
      expect(getByLabelText('Sort Descending Icon')).toBeInTheDocument();
    });

    test('clicking sort icon renders highest id at the top', async () => {
      const { getByLabelText } = render(
        <TableWithHook columnProps={{ enableSorting: true }} />,
      );
      const { getHeaderByIndex, getRowByIndex } = getTestUtils();
      const sortIconButton = getHeaderByIndex(0)?.getSortIcon();
      userEvent.click(sortIconButton!, {}, { skipPointerEventsCheck: true });
      expect(getByLabelText('Sort Descending Icon')).toBeInTheDocument();
      const firstCell = getRowByIndex(0)?.getAllCells()[0];
      expect(firstCell).toHaveTextContent('3');
    });

    test('clicking sort icon twice renders lowest id at the top', async () => {
      const { getByLabelText } = render(
        <TableWithHook columnProps={{ enableSorting: true }} />,
      );
      const { getHeaderByIndex, getRowByIndex } = getTestUtils();
      const sortIconButton = getHeaderByIndex(0)?.getSortIcon();
      userEvent.click(sortIconButton!, {}, { skipPointerEventsCheck: true });
      userEvent.click(sortIconButton!, {}, { skipPointerEventsCheck: true });
      expect(getByLabelText('Sort Ascending Icon')).toBeInTheDocument();
      const firstCell = getRowByIndex(0)?.getAllCells()[0];
      expect(firstCell).toHaveTextContent('1');
    });

    test('clicking sort icon thrice renders the initial id at the top', async () => {
      const { getByLabelText } = render(
        <TableWithHook columnProps={{ enableSorting: true }} />,
      );
      const { getHeaderByIndex, getRowByIndex } = getTestUtils();
      const sortIconButton = getHeaderByIndex(0)?.getSortIcon();
      const initialFirstId = getRowByIndex(0)?.getAllCells()[0].textContent;
      userEvent.click(sortIconButton!, {}, { skipPointerEventsCheck: true });
      userEvent.click(sortIconButton!, {}, { skipPointerEventsCheck: true });
      userEvent.click(sortIconButton!, {}, { skipPointerEventsCheck: true });
      expect(getByLabelText('Unsorted Icon')).toBeInTheDocument();
      const firstCell = getRowByIndex(0)?.getAllCells()[0];
      expect(firstCell).toHaveTextContent(initialFirstId!);
    });
  });
});
